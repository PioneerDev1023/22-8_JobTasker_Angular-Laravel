<?php

namespace App\Http\Controllers\api;
use App\Http\Controllers\Controller;
use Validator, Auth, Gate, File, Mail, Hash,Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Helpers\Response as R;
use App\Http\Helpers\Helper as H;
use App\Models\User;
use App\Models\Profile;
use App\Models\JobPost;
use App\Models\JobOffer;
use App\Models\Skill;
use App\Models\Portfolio;
use App\Models\Badge;
use App\Models\JobReport;
use App\Models\UserPaymentMethod;
use App\Models\Dispute;
use App\Models\ProfileSkill;
use App\Models\JobPostHistory;
use App\Models\TaskerBankDetail;
use App\Models\ProfileCategory;
use App\Models\Transactions;
use App\Mail\GeneralEmail;
use Carbon\Carbon;
use \Log;
use Stripe;

class ProfileController extends Controller
{

    public function __construct(Request $request)

    {

        $this->request = $request;

    }



    public function ProfileImage($image)
    {

        $path = storage_path('app/public/images/'.$image);

        $file = File::get($path);

        $type = File::mimeType($path);

        $response = \Response::make($file, 200);

        $response->header("Content-type", $type);

        return $response;

    }

    
    public function ProfileImageById($id)
    {
        $data = Profile::find($id);

        $profile_image = ($data['profile_image'] == null) ? 'avatar.png' : $data['profile_image'];

        //dd($data['profile_image']);

        $path = storage_path('app/public/images/'.$profile_image);

        $file = File::get($path);

        $type = File::mimeType($path);

        $response = \Response::make($file, 200);

        $response->header("Content-type", $type);

        return $response;

    }

    public function Profile()
    {
        $data = Profile::where('id', Auth::id())->first();

        return R::Success('Profile', $data);
    }

    public function getBank()
    {
        $data = TaskerBankDetail::where('user_id', Auth::Id())->first();
        return R::Success('Bank Detail', $data);
    }

    public function addBank(Request $request){
        $inputs = $this->request->all();

        $v = Validator::make($inputs, [

            'account_title' => 'required',
            'account_no' => 'required',
            'bsb' => 'required',

        ]);

        if($v->fails()){

            return R::ValidationError($v->errors());

        }

        $postData = [
            'user_id' => Auth::Id(),
            'account_title'=> $inputs['account_title'],
            'account_no'=> $inputs['account_no'],
            'bsb'=> $inputs['bsb'],
        ];

        try {
            $data = TaskerBankDetail::create($postData);
            return R::Success('Bank Added Successfully', $data);

        } catch (Exception $e) {

            DB::rollback();

            return R::SimpleError("Can't save data");

        }

    }

    public function updateBank(Request $request){
        $inputs = $this->request->all();

        $v = Validator::make($inputs, [

            'account_title' => 'required',
            'account_no' => 'required',
            'bsb' => 'required',

        ]);

        if($v->fails()){

            return R::ValidationError($v->errors());

        }

        $postData = [
            'account_title'=> $inputs['account_title'],
            'account_no'=> $inputs['account_no'],
            'bsb'=> $inputs['bsb'],
        ];

        try {
            $data = TaskerBankDetail::where('user_id', Auth::Id())->update($postData);
            return R::Success('Bank Added Successfully', $data);

        } catch (Exception $e) {

            DB::rollback();

            return R::SimpleError("Can't save data");

        }

    }

    public function updateProfile(Request $request){

        $postcode = $request->get('postcode');
        $state = $request->get('state');
        $abn = $request->get('abn');
        $first_name = $request->get('first_name');
        $last_name = $request->get('last_name');
        $phone_number = $request->get('phone_number');
        $full_name = $first_name.' '.$last_name;
        $user_id = $request->get('user_id');

        $profile = Profile::find($user_id);
        $user = User::find($user_id);
        if($profile && $user){
            $profile->postcode = $postcode;
            $profile->state = $state;
            $profile->abn = $abn;
            $profile->first_name = $first_name;
            $profile->last_name = $last_name;
            $profile->phone_number = $phone_number;
            if($request->hasFile('profile_image')){
                $completeFileName = $request->file('profile_image')->getClientOriginalName();
                $fileNameOnly = pathinfo($completeFileName, PATHINFO_FILENAME);
                $extenstion = $request->file('profile_image')->getClientOriginalExtension();
                $compPic = str_replace(' ','_',$fileNameOnly).'-'.rand().'_'.time().'.'.$extenstion;
                $path = $request->file('profile_image')->storeAs('public/images',$compPic);
                $profile->profile_image = $compPic;
            }
            $profile->update();
            $user->name = $full_name;
            $user->update();
            return response()->json([
                "status" => true,
                "msg" => "Profile Update Successfully!"
            ]);
        }
        else{
            return response()->json([
                "status" => false,
                "msg" => "Profile Not Updated!"
            ]);
        }
    }



    public function getTaskerInfo()
    {
        $data = User::with('Profile')->where('user_type','tasker')->get();
        return R::Success('Tasker Detail', $data);
    }


    public function getPosterInfo()
    {
        $data = User::with('Profile')->where('user_type','poster')->get();
        return R::Success('Poster Detail', $data);
    }

    public function getDisputeInfo()
    {
        $data = Dispute::with('JobPost','JobPost.winOffer','FilledBy','FilledAgainst','Winner')
        ->get();
        return R::Success('Disputes', $data);

    }

    public function UpdateDispute(){
        $inputs = $this->request->all();

        $v = Validator::make($inputs, [

            'winner_id' => 'required',
            'reason' => 'required',

        ]);

        if($v->fails()){
            return R::ValidationError($v->errors());
        }

        $postData = [
            'winner_id'=> $inputs['winner_id'],
            'reason'=> $inputs['reason'],
            'status' => 'CLOSED'
        ];

        try {
            $data = Dispute::where('id', $inputs['id'])->update($postData);

            $data = Dispute::with('JobPost','JobPost.winOffer','FilledBy','FilledAgainst','Winner')
            ->where('id', $inputs['id'])
            ->first();
            return R::Success('dispute updated', $data);

        } catch (Exception $e) {

            DB::rollback();

            return R::SimpleError("Can't save data");

        }

    }

    public function MyJobList()
    {
        $data = JobPost::with('postedBy','timeRange','totalOffer.OfferBy','totalQuestion.QuestionBy')
                ->where('posted_by_id', Auth::id())
                ->orderBy('id','DESC')
                ->get();

        return R::Success('My Job Post', $data);
    }

    public function MyJobListCompleted()
    {
        $data = JobPost::with('postedBy','timeRange','totalOffer.OfferBy','totalQuestion.QuestionBy')
                ->where('assign_to_id', Auth::id())
                ->where('status', 'COMPLETED')
                ->orderBy('id','DESC')
                ->get();

        return R::Success('My Job Post', $data);
    }

    public function MyJobListCompletedPoster()
    {
        $data = JobPost::with('postedBy','timeRange','totalOffer.OfferBy','totalQuestion.QuestionBy','assignBy')
                ->where('posted_by_id', Auth::id())
                ->where('status', 'COMPLETED')
                ->orderBy('id','DESC')
                ->get();

        return R::Success('My Job Post', $data);
    }



    public function GetMyJobOffer($id)

    {

        $data = JobPost::with('postedBy','timeRange','totalOffer.OfferBy','totalQuestion.QuestionBy','review')

                ->where('id', $id)

                ->where('posted_by_id', Auth::id())

                ->first();



        return R::Success('Job Post', $data);

    }



    public function AssignJob()

    {



        $inputs = $this->request->all();

        $v = Validator::make($inputs, [

            'id' => 'required',

            'job_offer_id' => 'required',

            'assign_to_id' => 'required',

            'delivery_time' => 'required',

        ]);



        if($v->fails()){

            return R::ValidationError($v->errors());

        }



        $jobData = [

            'assign_to_id' => $inputs['assign_to_id'],

            'delivery_time' => $inputs['delivery_time'],

            'job_offer_id' => $inputs['job_offer_id'],

            'status' => 'ASSIGNED'

        ];



        $jobHistory = [

            'job_post_id' => $inputs['id'],

            'job_offer_id' => $inputs['job_offer_id'],

            'status' => 'ASSIGNED'

        ];



       DB::beginTransaction();

       try {

            $dt = JobPost::where('id', $inputs['id'])->update($jobData);



            JobPostHistory::create($jobHistory);



            DB::commit();



            $data = JobPost::with('postedBy','timeRange','totalOffer.OfferBy','totalQuestion.QuestionBy')

                    ->where('id', $inputs['id'])

                    ->where('posted_by_id', Auth::id())

                    ->first();



            $user = User::where('id', Auth::id())->with('profile')->first();

            $assign_to = User::where('id', $inputs['assign_to_id'])->with('profile')->first();



            // Job Created

            $msg = '<p>You have assign this job to <strong>'.$assign_to->name.'</strong></p>';

            Mail::to($user->email)->send(new GeneralEmail(['name' =>' JobTasker - Assigned - '.$data['what_do_you'],'to' =>$user->name],' JobTasker', $msg));



            // Job Assigned To

            $msg = '<p><strong>'.$user->name.'</strong> have assigned you the job </p>';

            Mail::to($assign_to->email)->send(new GeneralEmail(['name' =>' JobTasker - Assigned - '.$data['what_do_you'],'to' =>$assign_to->name],' JobTasker', $msg));



            return R::Success('Job Assigned Successfully', $data);



       } catch (Exception $e) {

         DB::rollback();

         return R::SimpleError("Can't save data");

       }

    }



    public function PaymentRequest()

    {



        $inputs = $this->request->all();

        $v = Validator::make($inputs, [

            'id' => 'required'

        ]);



        if($v->fails()){

            return R::ValidationError($v->errors());

        }



        $mytime = Carbon::now();



        $jobData = [

            'payment_request' => 1,

            'payment_request_date' => $mytime

        ];



       DB::beginTransaction();

       try {

            $dt = JobPost::where('id', $inputs['id'])->update($jobData);



            DB::commit();



            $data = JobPost::with('postedBy','timeRange','totalOffer.OfferBy','totalQuestion.QuestionBy')

                    ->where('assign_to_id', Auth::id())

                    ->get();



            $mail = JobPost::with('postedBy','timeRange','totalOffer.OfferBy','totalQuestion.QuestionBy')

                    ->where('id', $inputs['id'])

                    ->first();





            $postedById = JobPost::where('id', $inputs['id'])->first()->posted_by_id;



            $user = User::where('id', $postedById)->with('profile')->first();

            $assign_to = User::where('id', Auth::id())->with('profile')->first();



            // Job Created

            $msg = '<p>The <strong>'.$assign_to->name.'</strong> has request to make payment</p>';

            Mail::to($user->email)->send(new GeneralEmail(['name' =>' JobTasker - Payment Request - '.$mail['what_do_you'],'to' =>$user->name],' JobTasker', $msg));



            // Job Assigned To

            $msg = '<p>The payment request has been sended to <strong>'.$user->name.'</strong></p>';

            Mail::to($assign_to->email)->send(new GeneralEmail(['name' =>' JobTasker - Payment Request - '.$mail['what_do_you'],'to' =>$assign_to->name],' JobTasker', $msg));



            return R::Success('Job Payment Successfully', $data);



       } catch (Exception $e) {

         DB::rollback();

         return R::SimpleError("Can't save data");

       }

    }



    public function CompleteJob()

    {



        $inputs = $this->request->all();

        $v = Validator::make($inputs, [

            'id' => 'required',

            'assign_to_id' => 'required',

            'delivery_time' => 'required',

        ]);



        if($v->fails()){

            return R::ValidationError($v->errors());

        }



        $jobData = [

            'assign_to_id' => $inputs['assign_to_id'],

            'delivery_time' => $inputs['delivery_time'],

            'status' => 'COMPLETED'

        ];



        $jobHistory = [

            'job_post_id' => $inputs['id'],

            'status' => 'COMPLETED'

        ];



       DB::beginTransaction();

       try {

            $dt = JobPost::where('id', $inputs['id'])->update($jobData);



            JobPostHistory::create($jobHistory);



            DB::commit();



            $data = JobPost::with('postedBy','timeRange','totalOffer.OfferBy','totalQuestion.QuestionBy')

                    ->where('id', $inputs['id'])

                    ->where('posted_by_id', Auth::id())

                    ->first();



            $user = User::where('id', Auth::id())->with('profile')->first();

            $assign_to = User::where('id', $inputs['assign_to_id'])->with('profile')->first();



            // Job Created

            $msg = '<p>You marked the job complete. which was assigned to <strong>'.$assign_to->name.'</strong></p>';

            Mail::to($user->email)->send(new GeneralEmail(['name' =>$data['what_do_you'],'to' =>$user->name],' JobTasker - Completed - '.$data['what_do_you'], $msg));



            // Job Assigned To

            $msg = '<p> You have completed the job. <strong>'.$user->name.'</strong> marked the job complate </p>';

            Mail::to($assign_to->email)->send(new GeneralEmail(['name' =>$data['what_do_you'],'to' =>$assign_to->name],' JobTasker - Complated - '.$data['what_do_you'], $msg));



            return R::Success('Job Assigned Successfully', $data);



       } catch (Exception $e) {

         DB::rollback();

         return R::SimpleError("Can't save data");

       }

    }



    public function MyTaskerJob()

    {

        $data = JobPost::with('postedBy','timeRange','totalOffer.OfferBy','totalQuestion.QuestionBy', 'tasker_review')

                    ->where('assign_to_id', Auth::id())

                    ->get();



        return R::Success('My Tasker Job', $data);

    }



    public function MySkills()
    {
        $data = ProfileSkill::with('Skill')
                    ->where('user_id', Auth::id())
                    ->get();

        return R::Success('My Skills', $data);
    }
    
    public function MyCategory()
    {
        $data = ProfileCategory::with('category')
                    ->where('user_id', Auth::id())
                    ->get();

        return R::Success('My Skills', $data);
    }
    
    public function MyCategories()
    {
        $data = ProfileSkill::with('Skill')
                    ->where('user_id', Auth::id())
                    ->get();

        return R::Success('My Skills', $data);
    }



    public function addSkill()

    {

        $inputs = $this->request->all();

        $v = Validator::make($inputs, [

            'title' => 'required',

        ]);



        if($v->fails()){

            return R::ValidationError($v->errors());

        }



        $data = [

            'title' => $inputs['title']

        ];



       //DB::beginTransaction();

       try {



            $check = Skill::where('title', $data['title'])->first();



            if ($check != null) {

                $data = $check;

            } else {

                $data = Skill::create($data);

            }            
            //DB::commit();
            return R::Success('New Skill added', $data);
       } catch (Exception $e) {
         DB::rollback();
         return R::SimpleError("Can't save data");  
       }
    }

    public function UpdateCategory()
    {
        $inputs = $this->request->all();

        $v = Validator::make($inputs, [
            'categoryList' => 'required',
        ]);

        if($v->fails()){
            return R::ValidationError($v->errors());
        }

        $data = [
            'categoryList' => $inputs['categoryList']
        ];

        DB::beginTransaction();     
        try {

            $data = (object)$data;

            $newData = null;

            foreach ($data->categoryList as $item) {
                $check = ProfileCategory::where('post_ad_category_id', $item['id'])->where('user_id', Auth::id())->get();

                if ($check->count() == 0) {
                    $newData[] = ProfileCategory::create(
                        [
                            'post_ad_category_id' => (int)$item['id'],
                            'user_id' => Auth::id()
                        ]
                    );
                }

            }         
            DB::commit();

            return R::Success('New Category list', $newData);

       } catch (Exception $e) {

         DB::rollback();

         return R::SimpleError("Can't save data");

       }

    }

    public function UpdateSkill()
    {
        $inputs = $this->request->all();

        $v = Validator::make($inputs, [
            'skillList' => 'required',
        ]);

        if($v->fails()){
            return R::ValidationError($v->errors());
        }

        $data = [
            'skillList' => $inputs['skillList']
        ];



       DB::beginTransaction();

     

            $data = (object)$data;

        DB::beginTransaction();     
        try {

            $data = (object)$data;


            $newData = null;

            foreach ($data->skillList as $item) {
                $check = ProfileSkill::where('skill_id', $item['id'])->where('user_id', Auth::id())->get();


                if ($check->count() == 0) {
                    $newData[] = ProfileSkill::create(
                        [
                            'skill_id' => (int)$item['id'],
                            'user_id' => Auth::id()
                        ]
                    );
                }

            }         

            DB::commit();

            return R::Success('New skill list', $newData);
        

       } catch (Exception $e) {

         DB::rollback();
         return R::SimpleError("Can't save data");

       }

    }



    // Payment Method

    public function MyPaymentMethod()

    {

        $data = UserPaymentMethod::where('user_id', Auth::id())

                ->get();



        return R::Success('My Payment Method', $data);

    }



    public function AddPaymentMethod()

    {



        $inputs = $this->request->all();

        $v = Validator::make($inputs, [

            'last4' => 'required',

            'exp_month' => 'required',

            'exp_year' => 'required',

            'brand' => 'required',
            'payment_id' => 'required'

        ]);



        if($v->fails()){

            return R::ValidationError($v->errors());

        }



        $postdata = [

            'user_id' => Auth::id(),

            'brand' => $inputs['brand'],

            'last4' => $inputs['last4'],

            'exp_month' => $inputs['exp_month'],

            'exp_year' => $inputs['exp_year'],

            'alldata' => $inputs['alldata'],
            'payment_id' => $inputs['payment_id'],

        ];



       DB::beginTransaction();

       try {

            $dispute = UserPaymentMethod::create($postdata);



            DB::commit();



            $data = UserPaymentMethod::where('user_id', Auth::id())->get();



            $user = User::where('id', Auth::id())->with('profile')->first();



            // Payment Added Created by

            $msg = '<p><strong>'.$user->name.'</strong> <br> Your payment added. Your card end with '. $inputs['last4'] .'</p>';

            Mail::to($user->email)->send(new GeneralEmail(['name' =>'Payment Method','to' =>$user->name],' JobTasker - Payment Method', $msg));



            return R::Success('Job Dispute Created Successfully', $data);



       } catch (Exception $e) {

         DB::rollback();

         return R::SimpleError("Can't save data");

       }

    }



    // Dispute Management

    public function CreateDispute()

    {



        $inputs = $this->request->all();

        $v = Validator::make($inputs, [

            'job_post_id' => 'required',

            'title' => 'required',

            'detail' => 'required',

        ]);



        if($v->fails()){

            return R::ValidationError($v->errors());

        }



        // $jobData = [

        //     'filled_by_id' => $inputs['filled_by_id'],

        //     'job_post_id' => $inputs['job_post_id'],

        //     'title' => $inputs['title'],

        //     'detail' => $inputs['detail']

        // ];



        $job = JobPost::where('id', $inputs['job_post_id'])->first();



        $against_id = ($job->posted_by_id == Auth::id()) ? $job->assign_to_id : $job->posted_by_id;



        $postdata = [

            'filled_by_id' => Auth::id(),

            'job_post_id' => $inputs['job_post_id'],

            'title' => $inputs['title'],

            'detail' => $inputs['detail'],

            'status' => 'OPEN',

            'against_id' => $against_id,

            'assign_no' => $job->posted_by_id . '_' . $job->assign_to_id . '_' . $job->id

        ];



        $check = Dispute::where('assign_no', $postdata['assign_no'])->get();



        if ($check->count() > 0) {

            return R::Success('The dispute is already created on this task', $check);

        }



       DB::beginTransaction();

       try {

            $dispute = Dispute::create($postdata);



            DB::commit();



            // $data = JobPost::with('postedBy','timeRange','totalOffer.OfferBy','totalQuestion.QuestionBy')

            //         ->where('id', $inputs['id'])

            //         ->where('posted_by_id', Auth::id())

            //         ->first();



            $user = User::where('id', $job->posted_by_id)->with('profile')->first();

            $assign_to = User::where('id', $job->assign_to_id)->with('profile')->first();



            // Dispute Created by

            $msg = '<p><strong>'.$assign_to->name.'</strong> <br> dispute has been create kindly review it.</p>';

            Mail::to($user->email)->send(new GeneralEmail(['name' =>$job->what_do_you,'to' =>$user->name],' JobTasker - Completed - '.$job->what_do_you, $msg));



            // Dispute Other party

            $msg = '<p><strong>'.$user->name.'</strong> <br> dispute has been create kindly review it.</p>';

            Mail::to($assign_to->email)->send(new GeneralEmail(['name' =>$job->what_do_you,'to' =>$assign_to->name],' JobTasker - Complated - '.$job->what_do_you, $msg));



            return R::Success('Job Dispute Created Successfully', $dispute);



       } catch (Exception $e) {

         DB::rollback();

         return R::SimpleError("Can't save data");

       }

    }



    public function getMyDispute()

    {

        $data = Dispute::with('JobPost','JobPost.winOffer','FilledBy','FilledAgainst')

                ->where('filled_by_id', Auth::id())

                ->get();



        return R::Success('Disputes', $data);

    }



    public function getDisputeAgainestMe()

    {

        $data = Dispute::with('JobPost','JobPost.winOffer','FilledBy','FilledAgainst')

                ->where('against_id', Auth::id())

                ->get();



        return R::Success('Disputes', $data);

    }

    public function Payment()
    {
        Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
        $strip = Stripe\Charge::create ([
                "amount" => $this->request->amount * 100,
                "currency" => "usd",
                "source" => $this->request->stripeToken,
                "description" => "JobTasker Payment Received from project > ".$this->request->description
        ]);

        $obj = [
            'stripe_id' => $strip->id,
            'paidby_id' => Auth::id(),
            'amount' => $this->request->amount,
            'job_posts_id' => $this->request->job_posts_id,
            'tran_status' => 0
        ];

        Transactions::create($obj);
        JobPost::where('id', $this->request->job_posts_id)->update([
            'payment_request' => 2
        ]);

        return R::Success('Payment Save Successfully', $strip);
    }

    public function TransectionDetail()
    {
        $data = Transactions::with('paidBy','jobPost.OfferBy', 'jobPosts.assignBy')->get();

        return R::Success('Tran detail', $data);
    }

    public function MyTransectionDetail()
    {
        $data = Transactions::with('paidBy','jobPost.OfferBy','jobPosts.assignBy')
        ->where('paidby_id',Auth::id())
        ->get();

        return R::Success('Tran detail', $data);
    }

    public function MyRecTransectionDetail()
    {
        $data = Transactions::with('paidBy','jobPost.OfferBy','jobPosts')
        ->whereHas('jobPosts.assignBy', function($q){
            $q->where('id','=',Auth::id());
        })
        ->get();

        return R::Success('Tran detail', $data);
    }

    public function TransectionDetailRelesed()
    {
        $data = Transactions::with('paidBy','jobPost.OfferBy')
        ->where('tran_status', 1)
        ->get();

        return R::Success('Tran detail release', $data);
    }

    public function TransectionDetailRejected()
    {
        $data = Transactions::with('paidBy','jobPost.OfferBy')
        ->where('tran_status', 2)
        ->get();

        return R::Success('Tran detail rejected', $data);
    }

    public function GetBankDetail($id)
    {
        $data = TaskerBankDetail::where('user_id', $id)->first();

        return R::Success('User Bank Detail', $data);
    }

    public function SetRelease()
    {
        try {
            $id = $this->request->id;

            $tran = Transactions::where('id', $id)->first();
            $post = JobPost::where('id', $tran->job_posts_id)->first();
            $offerby = Profile::where('id', $post->assign_to_id)->first();
            $posts = JobPost::where('id', $tran->job_posts_id)->first();


            $project = $posts->what_do_you;
            $toName = $offerby->first_name . ' ' . $offerby->last_name;
            $msg = "Dear " . $toName . " you payment sent by admin to your bank acount for the porject : ". $project;
            $number = $offerby->phone_number;

            Log::info('MSG: '.$msg);

            $obj = ['tran_status' => 1, 'prove_no' => $this->request->prove_no ];

            $data = Transactions::where('id', $id)->update($obj);

            $h = new H();

            $resp = $h->sendSMS($number,$msg);

            return R::Success('update', $data);
        } catch (\Exception $e){
			//return dd($e);
            Log::info( $e);
			return R::SimpleError($e);
		}
    }

    public function SetReject()
    {
        $id = $this->request->id;

        $obj = ['tran_status' => 2, 'reject_detail' => $this->request->reject_detail ];

        $data = Transactions::where('id', $id)->update($obj);

        return R::Success('update', $data);
    }


    # Portfolio

    public function PortfolioImage($id)
    {
        $image = Portfolio::find($id);

        $image = ($image['photo'] == null) ? 'avatar.jpg' : $image['photo'];

        $path = public_path('assets/portfolio/'.$image);

        $file = File::get($path);
        $type = File::mimeType($path);
        $response = \Response::make($file, 200);

        $response->header("Content-type", $type);
        return $response;
    }

    public function getPortfolio()
    {
        $data = Portfolio::where('user_id', Auth::id())->get();
        return R::Success('My Portfolio', $data);
    }

    public function Upload()
    {
        $this->request->validate([
            'photo' => 'required',
        ]);

        $fileName = time().'.'.$this->request->photo->extension();  
        $this->request->photo->move(public_path('assets/Portfolio/'), $fileName);

        return $fileName;

    }

    public function addPortfolio(Request $request){
        $inputs = $this->request->all();

        $v = Validator::make($inputs, [
            'title' => 'required',
            'description' => 'required',
            'photo' => 'required'
        ]);

        if($v->fails()){
            return R::ValidationError($v->errors());
        }

        $postData = [
            'user_id' => Auth::Id(),
            'title'=> $inputs['title'],
            'description'=> $inputs['description'],
            'photo' => $this->Upload()
        ];

        try {
            $data = Portfolio::create($postData);

            $data = Portfolio::where('user_id', Auth::id())->get();
            return R::Success('Portfolio Added Successfully', $data);

        } catch (Exception $e) {

            DB::rollback();

            return R::SimpleError("Can't save data");  

        }

    }

    public function updatePortfolio(Request $request){
        $inputs = $this->request->all();

        $v = Validator::make($inputs, [

            'title' => 'required',
            'description' => 'required',

        ]);

        if($v->fails()){

            return R::ValidationError($v->errors());

        }

        $postData = [

            'title'=> $inputs['title'],
            'description'=> $inputs['description'],
        ];

        try {
            $data = Portfolio::where('user_id', Auth::id())->update($postData);
            return R::Success('Portfolio Added Successfully', $data);

        } catch (Exception $e) {

            DB::rollback();

            return R::SimpleError("Can't save data");  

        }

    }

    # Tasker Badges


    public function allBadges()
    {
        $data = Badge::get();
        return R::Success('All Badge', $data);
    }

    public function ChangeBadgeStatus($id)
    {
        $data = Badge::find($id);

        $currentStatus = ($data->status == 1) ? 0 : 1;

        $newData = ['status' => $currentStatus];

        $data->update($newData);

        return R::Success('Change the Status', $data);

    }

    public function BadgeImage($id)
    {
        $image = Badge::find($id);

        $image = ($image['photo'] == null) ? 'avatar.jpg' : $image['photo'];

        $path = public_path('assets/badges/'.$image);

        $file = File::get($path);
        $type = File::mimeType($path);
        $response = \Response::make($file, 200);

        $response->header("Content-type", $type);
        return $response;
    }

    public function getBadges()
    {
        $data = Badge::where('user_id', Auth::id())->get();
        return R::Success('My Badge', $data);
    }

    public function Bupload()
    {
        $this->request->validate([
            'photo' => 'required',
        ]);

        $fileName = time().'.'.$this->request->photo->extension();  
        $this->request->photo->move(public_path('assets/Badges/'), $fileName);

        return $fileName;

    }

    public function addBadges(Request $request){
        $inputs = $this->request->all();

        $v = Validator::make($inputs, [
            'lic_badge' => 'required',
            'first_name' => 'required',
            'last_name' => 'required',
            'jt_email' => 'required',
            'lic_number' => 'required',
            'lic_exp' => 'required',
            'lic_rest' => 'required',
            'photo' => 'required'
        ]);

        if($v->fails()){
            return R::ValidationError($v->errors());
        }

        $postData = [
            'user_id' => Auth::Id(),
            'lic_badge'=> $inputs['lic_badge'],
            'first_name'=> $inputs['first_name'],
            'last_name'=> $inputs['last_name'],
            'jt_email'=> $inputs['jt_email'],
            'lic_number'=> $inputs['lic_number'],
            'lic_exp'=> $inputs['lic_exp'],
            'lic_rest'=> $inputs['lic_rest'],
            'photo' => $this->Bupload()
        ];

        try {
            $data = Badge::create($postData);

            $data = Badge::where('user_id', Auth::id())->get();
            return R::Success('Badge Added Successfully', $data);

        } catch (Exception $e) {

            DB::rollback();

            return R::SimpleError("Can't save data");  

        }

    }

    public function updateBadges(Request $request){
        $inputs = $this->request->all();

        $v = Validator::make($inputs, [

            'lic_badge' => 'required',
            'first_name' => 'required',
            'last_name' => 'required',
            'jt_email' => 'required',
            'lic_number' => 'required',
            'lic_exp' => 'required',
            'lic_rest' => 'required',

        ]);

        if($v->fails()){

            return R::ValidationError($v->errors());

        }

        $postData = [

            'lic_badge'=> $inputs['lic_badge'],
            'first_name'=> $inputs['first_name'],
            'last_name'=> $inputs['last_name'],
            'jt_email'=> $inputs['jt_email'],
            'lic_number'=> $inputs['lic_number'],
            'lic_exp'=> $inputs['lic_exp'],
            'lic_rest'=> $inputs['lic_rest'],
        ];

        try {
            $data = Badge::where('user_id', Auth::id())->update($postData);
            return R::Success('Badge Updated Successfully', $data);

        } catch (Exception $e) {

            DB::rollback();

            return R::SimpleError("Can't save data");  

        }

    }


    public function addReview(){
        $inputs = request()->all();
        $validate = Validator::make($inputs, [
            'review' => 'required',
            'review_rating' => 'required'
        ]);
        if($validate->fails()){
            return response()->json([
                'status' => false,
                'msg' => 'There is validation issue kindly review the form again!!'
            ]);
        }
        $inserted = DB::table('job_reviews')->insert([
            'job_id' => $inputs['job_id'],
            'tasker_id' => $inputs['tasker_id'],
            'review' => $inputs['review'],
            'review_rating' => $inputs['review_rating']
        ]);
        if($inserted){
            return response()->json([
                'status' => true,
                'msg' => 'Review Added Successfully!'
            ]);
        }
        else{
            return response()->json([
                'status' => false,
                'msg' => 'Review Not Added!'
            ]);
        }
    }

    public function addTaskerReview(){
        $inputs = request()->all();
        $validate = Validator::make($inputs, [
            'review' => 'required',
            'review_rating' => 'required'
        ]);
        if($validate->fails()){
            return response()->json([
                'status' => false,
                'msg' => 'There is validation issue kindly review the form again!!'
            ]);
        }
        $inserted = DB::table('tasker_reviews')->insert([
            'job_id' => $inputs['job_id'],
            'poster_id' => $inputs['poster_id'],
            'review' => $inputs['review'],
            'review_rating' => $inputs['review_rating']
        ]);
        if($inserted){
            return response()->json([
                'status' => true,
                'msg' => 'Review Added Successfully!'
            ]);
        }
        else{
            return response()->json([
                'status' => false,
                'msg' => 'Review Not Added!'
            ]);
        }
    }

    public function getReviews($id){
        $reviews = DB::table('job_reviews')->select('job_reviews.*','users.name')
        ->leftjoin('job_posts','job_posts.id','=','job_reviews.job_id')
        ->leftjoin('users','users.id','=','job_posts.posted_by_id')
        ->where('job_reviews.tasker_id',$id)
        ->get();
        $rating=DB::table('job_reviews')
        ->selectRaw('(select count(*) from job_reviews where tasker_id ='.$id.' and review_rating = 5) as five')
        ->selectRaw('(select count(*) from job_reviews where tasker_id ='.$id.' and review_rating = 4) as four')
        ->selectRaw('(select count(*) from job_reviews where tasker_id ='.$id.' and review_rating = 3) as three')
        ->selectRaw('(select count(*) from job_reviews where tasker_id ='.$id.' and review_rating = 2) as two')
        ->selectRaw('(select count(*) from job_reviews where tasker_id ='.$id.' and review_rating = 1) as one')
        ->first();
        $total_rating=$rating->five+$rating->four+$rating->three+$rating->two+$rating->one;
        $rating=((5*$rating->five)+(4*$rating->four)+(3*$rating->three)+(2*$rating->two)+(1*$rating->one))/($total_rating);
        if($reviews){
            return response()->json([
                'status'=>true,
                'data'=>$reviews,
                'rating'=>$rating,
                'total_rating'=>$total_rating
            ]);
        }
    }

    public function getTaskerReviews($id){
        $reviews = DB::table('job_reviews')->select('job_reviews.*','users.name','job_posts.what_do_you')
        ->leftjoin('job_posts','job_posts.id','=','job_reviews.job_id')
        ->leftjoin('users','users.id','=','job_posts.posted_by_id')
        ->where('job_reviews.tasker_id',$id)
        ->get();
        if($reviews){
            return response()->json([
                'status'=>true,
                'data'=>$reviews
            ]);
        }
    }
    public function getPosterReviews($id){
        $reviews = DB::table('tasker_reviews')->select('tasker_reviews.*','users.name','job_posts.what_do_you')
        ->leftjoin('job_posts','job_posts.id','=','tasker_reviews.job_id')
        ->leftjoin('users','users.id','=','job_posts.assign_to_id')
        ->where('tasker_reviews.poster_id',$id)
        ->get();
        if($reviews){
            return response()->json([
                'status'=>true,
                'data'=>$reviews
            ]);
        }
    }



    public function addPostReport(){
        $inputs = $this->request->all();

        $v = Validator::make($inputs, [
            'job_post_id' => 'required',
            'detail' => 'required'
        ]);

        if($v->fails()){
            return R::ValidationError($v->errors());
        }

        $postData = [
            'job_post_id'=> $inputs['job_post_id'],
            'reported_by_id'=> Auth::Id(),
            'detail'=> $inputs['detail'],
        ];

        try {
            $data = JobReport::create($postData);

            return R::Success('Job Report Register successfully', $data);

        } catch (Exception $e) {

            DB::rollback();

            return R::SimpleError("Can't save data");  

        }

    }

    public function getAdmin()
    {
        $data = User::find(6);

        return R::Success('Data', $data);
    }

    public function UpdateAdmin(){
        $inputs = $this->request->all();

        $v = Validator::make($inputs, [
            'name' => 'required',
            'email' => 'required',
            'password' => 'required'
        ]);

        if($v->fails()){
            return R::ValidationError($v->errors());
        }

        $postData = [
            'name'=> $inputs['name'],
            'email'=> $inputs['email'],
            'password'=> Hash::make($inputs['password']),
        ];

        try {
            $data = User::where('id', 6)->update($postData);

            $strName = explode(' ',$inputs['name']);

            $postData = [
                'first_name'=> $strName[0],
                'last_name'=> $strName[1],
                'email'=> $inputs['email'],
            ];

            $data = Profile::where('id', 6)->update($postData);

            return R::Success('Job Report Register successfully', $data);

        } catch (Exception $e) {

            DB::rollback();

            return R::SimpleError("Can't save data");  

        }

    }
    public function listPosterReviews(){
        $reviews = DB::table('job_reviews')->select('job_reviews.*','poster.name as poster_name','tasker.name as tasker_name','job_posts.what_do_you as job_title')
        ->leftjoin('job_posts','job_posts.id','=','job_reviews.job_id')
        ->leftjoin('users as poster','poster.id','=','job_posts.posted_by_id')
        ->leftjoin('users as tasker','tasker.id','=','job_posts.assign_to_id')
        ->get();
        if($reviews){
            return response()->json([
                'status' =>  true,
                'data' => $reviews
            ]);
        }
        else{
            return response()->json([
                'status' =>  false,
            ]); 
        }
    }

    public function listTaskerReviews(){
        $reviews = DB::table('tasker_reviews')->select('tasker_reviews.*','poster.name as poster_name','tasker.name as tasker_name','job_posts.what_do_you as job_title')
            ->leftjoin('job_posts','job_posts.id','=','tasker_reviews.job_id')
            ->leftjoin('users as poster','poster.id','=','job_posts.posted_by_id')
            ->leftjoin('users as tasker','tasker.id','=','job_posts.assign_to_id')
            ->get();
        if($reviews){
            return response()->json([
                'status' =>  true,
                'data' => $reviews
            ]);
        }
        else{
            return response()->json([
                'status' =>  false,
            ]); 
        }
    }

    public function delPosterReview($id){
        $del = DB::table('job_reviews')->where('id',$id)->delete();
        if($del){
            return response()->json([
                'status' =>  true,
                'msg' => 'Review Deleted!'
            ]);
        }
        else{
            return response()->json([
                'status' =>  false,
            ]); 
        }
    }
    
    public function delTaskerReview($id){
        $del = DB::table('tasker_reviews')->where('id',$id)->delete();
        if($del){
            return response()->json([
                'status' =>  true,
                'msg' => 'Review Deleted!'
            ]);
        }
        else{
            return response()->json([
                'status' =>  false,
            ]); 
        }
    }
}


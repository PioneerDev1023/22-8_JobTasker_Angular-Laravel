<?php



namespace App\Http\Controllers\api;



use App\Http\Controllers\Controller;

use Validator, Auth, DB, Gate, File, Mail, Hash, Storage;

use Illuminate\Http\Request;

use App\Http\Helpers\Response as R;
use App\Http\Helpers\Helper as H;
use App\Models\User;

use App\Models\Profile;

use App\Models\JobPost;

use App\Models\JobOffer;

use App\Models\JobQuestion;

use App\Mail\GeneralEmail;



class JobpostController extends Controller

{

    public function __construct(Request $request)

    {

        $this->request = $request;

    }

    
    public function JobPostImage($id)
    {
        $data = JobPost::find($id);

        $profile_image = ($data['photo'] == null) ? 'avatar.png' : $data['photo'];

        //dd($data['profile_image']);

        $path = public_path('assets/jobimages/'.$profile_image);

        $file = File::get($path);

        $type = File::mimeType($path);

        $response = \Response::make($file, 200);

        $response->header("Content-type", $type);

        return $response;

    }

    private function toSendFCM($msg)
    {
        $data = ["title" => 'New Job Post', "body" => $msg, "text" => $msg];

        $h = new H();

        $users = Profile::whereNotNull('fcm_token')->get();

        foreach ($users as $row) {
            $h->sendFCM($row->fcm_token, $data);    
        }

        
    }

    public function JobPost()

    {

        $inputs = $this->request->all();

        $v = Validator::make($inputs, [

            'what_do_you' => 'required',

            'where_do_you' => 'required',

            'required_Date' => 'required',

            'required_time_range' => 'required',

            'detail' => 'required',

            'budget' => 'required',

        ]);



        if($v->fails()){

            return R::ValidationError($v->errors());

        }

        $photo = '';
        $dt = gettype($inputs['photo']);
        if ($dt != 'string'){
            $photo = $this->UploadJobPost();
        }     

        $jobData = [

            'what_do_you' => $inputs['what_do_you'],

            'where_do_you' => $inputs['where_do_you'],

            'required_Date' => $inputs['required_Date'],

            'required_time_range' => $inputs['required_time_range'],

            'detail' => $inputs['detail'],

            'budget' => $inputs['budget'],

            'posted_by_id' => Auth::id(),

            'lat' => $inputs['lat'],

            'lng' => $inputs['lng'],

            'place_id' => $inputs['place_id'],

            'place_url' => $inputs['place_url'],

            'photo' => $photo

        ];

       DB::beginTransaction();     

       try {

            $user = JobPost::create($jobData);

            DB::commit();

            $user = User::where('id', Auth::id())->with('profile')->first();

            $msg = '<p>Your job have been created!</p>';

            Mail::to($user->email)->send(new GeneralEmail(['name' =>$inputs['what_do_you'],'to' =>$user->name],' JobTasker', $msg));

            $this->toSendFCM($inputs['what_do_you']);

            return R::Success('Job Posted Successfully', $jobData);

       } catch (Exception $e) {

         DB::rollback();

         return R::SimpleError("Can't save data");  

       }

    }



    public function UploadJobPost()
    {
        $this->request->validate([
            'photo' => 'required',
        ]);

        $fileName = time().'.'.$this->request->photo->extension();  
        $this->request->photo->move(public_path('assets/jobimages/'), $fileName);

        return $fileName;

    }

    public function GetPostList()
    {
        $data = JobPost::with('postedBy','timeRange','totalOffer')
        ->where('status','OPEN')
        ->orderBy('id','DESC')
        ->get();
        return R::Success('Job Post List', $data);
    }



    public function GetPost($id)

    {

        $data = JobPost::with('postedBy','timeRange','totalOffer.OfferBy','totalQuestion.QuestionBy')

                ->where('id', $id)

                ->first();



        return R::Success('Job Post', $data);

    }



    public function ReceiverOffer()

    {

        $inputs = $this->request->all();

        $v = Validator::make($inputs, [

            'job_post_id' => 'required',

            'amount' => 'required',

        ]);



        if($v->fails()){

            return R::ValidationError($v->errors());

        }



        $jobData = [

            'job_post_id' => $inputs['job_post_id'],

            'amount' => $inputs['amount'],

            'detail' => $inputs['detail'],

            'offer_by_id' => Auth::id()

        ];



       DB::beginTransaction();     

       try {

            $dt = JobOffer::create($jobData);

            

            DB::commit();



            $data = JobOffer::where('id', $dt->id)->first();



            return R::Success('Job Offer Send. Successfully', $data);



       } catch (Exception $e) {

         DB::rollback();

         return R::SimpleError("Can't save data");  

       }

    }



    public function ReceiverQuestion()

    {

        $inputs = $this->request->all();

        $v = Validator::make($inputs, [

            'job_post_id' => 'required',

            'detail' => 'required',

        ]);



        if($v->fails()){

            return R::ValidationError($v->errors());

        }



        $jobData = [

            'job_post_id' => $inputs['job_post_id'],

            'detail' => $inputs['detail'],

            'question_by_id' => Auth::id()

        ];



       DB::beginTransaction();     

       try {

            $dt = JobQuestion::create($jobData);

            

            DB::commit();



            $data = JobQuestion::with('QuestionBy')

            ->where('id', $dt->id)

            ->first();



            return R::Success('Job Question Send. Successfully', $data);



       } catch (Exception $e) {

         DB::rollback();

         return R::SimpleError("Can't save data");  

       }

    }

    // Filter
    public function GetPostListHeightLow()
    {
        $data = JobPost::with('postedBy','timeRange','totalOffer')
        ->where('status','OPEN')
        ->orderBy('budget','DESC')
        ->get();
        return R::Success('Job Post List', $data);
    }

    public function GetPostListLowHeight()
    {
        $data = JobPost::with('postedBy','timeRange','totalOffer')
        ->where('status','OPEN')
        ->orderBy('budget','ASC')
        ->get();
        return R::Success('Job Post List', $data);
    }

    public function GetPostListDueDateEarly()
    {
        $data = JobPost::with('postedBy','timeRange','totalOffer')
        ->where('status','OPEN')
        ->orderBy('required_date','DESC')
        ->get();
        return R::Success('Job Post List', $data);
    }

    public function GetPostListDueDateLast()
    {
        $data = JobPost::with('postedBy','timeRange','totalOffer')
        ->where('status','OPEN')
        ->orderBy('required_date','ASC')
        ->get();
        return R::Success('Job Post List', $data);
    }

    public function GetPostListOldDest()
    {
        $data = JobPost::with('postedBy','timeRange','totalOffer')
        ->where('status','OPEN')
        ->orderBy('id','DESC')
        ->get();
        return R::Success('Job Post List', $data);
    }

    public function GetPostListCloseToMe()
    {
        $data = JobPost::with('postedBy','timeRange','totalOffer')
        ->where('status','OPEN')
        ->orderBy('id','ASC')
        ->get();
        return R::Success('Job Post List', $data);
    }


}


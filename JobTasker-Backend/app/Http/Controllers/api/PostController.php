<?php



namespace App\Http\Controllers\api;



use App\Http\Controllers\Controller;

use Validator, Auth, DB, Gate, File, Mail, Hash,Storage;

use Illuminate\Http\Request;

use App\Http\Helpers\Response as R;

use App\Models\Post;
use App\Models\JobReport;

use App\Models\PostCategory;

use App\Models\PostAdCategory;
use App\Models\Badge;

use App\Models\PostadActJobs;

use App\Models\PostAdSkills;

use App\Models\PostComment;
use App\Models\SiteSetting;

use App\Models\JobPost;

use App\Mail\GeneralEmail;

use Carbon\Carbon;



class PostController extends Controller

{

    public function __construct(Request $request)

    {

        $this->request = $request;

    }



    public function Get()
    {

        $data = Post::with('Category')->get();



        return R::Success('post', $data);

    }

    public function DeletePost($id)
    {
        $data = Post::where('id',$id)->delete();

        return R::Success('post deleted', $data);
    }



    public function GetDetail($id)

    {

        $data = Post::with('Comments.commentby')->where('id', $id)->first();



        return R::Success('post', $data);

    }



    public function PostImage($image)
    {
        $path = public_path('assets/posts/'.$image);

        $file = File::get($path);
        $type = File::mimeType($path);
        $response = \Response::make($file, 200);

        $response->header("Content-type", $type);
        return $response;
    }



    public function Update()
    {

        $data = $this->request->all();

        $data['title'] = ($data['title'] == 'null') ? null : $data['title'];

        $maxid = 0;
        if ($data['image'] == '') {

            $row = Post::find($data['id']);
            $data['image'] = ($row == null) ? '' : $row->image;

        }
        else {
            $dt = gettype($data['image']);
            if ($dt != 'string'){
                $data['image'] = $this->Upload();
            }            
        }

        if ($data['id'] == "-1") {

            $maxid = Post::max('id');
            //dd($maxid);

            if ($maxid == null || $maxid == 0) 
            {
                $data['id'] = 1;
            } else  {
                $data['id'] = $maxid + 1;
            }
        }
        $data['posted_by_id'] = Auth::id();

        $resp = Post::updateOrCreate(['id' => $data['id'] ], $data);

        $data = Post::with('Category')->where('id', $data['id'])->first();
        // $data = Page::where('id', $data['page_id'])

        // ->with('Rows')

        // ->first();



        return R::Success('Post Modified', $data);

    }

    public function Upload()
    {
        $this->request->validate([
            'image' => 'required',
        ]);

        $fileName = time().'.'.$this->request->image->extension();  
        $this->request->image->move(public_path('assets/posts/'), $fileName);

        return $fileName;

    }

    public function UploadJobPost()
    {
        $this->request->validate([
            'image' => 'required',
        ]);

        $fileName = time().'.'.$this->request->image->extension();  
        $this->request->image->move(public_path('assets/jobimages/'), $fileName);

        return $fileName;

    }




    public function PostComment()

    {

        

        $inputs = $this->request->all();

        $v = Validator::make($inputs, [

            'detail' => 'required',

            'post_id' => 'required'

        ]);



        if($v->fails()){

            return R::ValidationError($v->errors());

        }



        $postData = [

            'post_id'=> $inputs['post_id'],

            'detail' => $inputs['detail'],

            'comment_by_id' => Auth::id()

        ];



       

       try {            

            

            PostComment::create($postData);



            $data = PostComment::with('commentby')->where('post_id', $inputs['post_id'])->get();



            return R::Success('Comments Successfully', $data);



       } catch (Exception $e) {

         DB::rollback();

         return R::SimpleError("Can't save data");  

       }

    }



    public function GetCategory()

    {

        $data = PostCategory::get();



        return R::Success('Post Category', $data);

    }

    

    public function AddCategory()

    {

        $inputs = $this->request->all();

        $v = Validator::make($inputs, [

            'title' => 'required',

        ]);



        if($v->fails()){

            return R::ValidationError($v->errors());

        }



        $postData = [

            'title'=> $inputs['title'],

            'status'=> '0',

        ];



        try {

            $data = PostCategory::create($postData);



            return R::Success('Category Changed Successfully', $data);



        } catch (Exception $e) {

            DB::rollback();

            return R::SimpleError("Can't save data");  

        }

    }

    

    public function UpdateCategory()

    {

        $inputs = $this->request->all();

        $v = Validator::make($inputs, [

            'title' => 'required',

        ]);



        if($v->fails()){

            return R::ValidationError($v->errors());

        }



        $postData = [

            'title'=> $inputs['title'],

            'status'=> '0',

        ];



        try {

            $data = PostCategory::updateOrCreate(['id' => $inputs['id'] ], $postData);



            return R::Success('Category Changed Successfully', $data);



        } catch (Exception $e) {

            DB::rollback();

            return R::SimpleError("Can't save data");  

        }
    }

    # Admin Created Job Categories
    public function GetAdjCategory()
    {
        $data = PostAdCategory::get();

        return R::Success('Post Category', $data);
    }

    public function DeleteAdminCat($id)
    {
        $data = PostAdCategory::where('id', $id)->delete();
        return R::Success('Post Category deleted', $data);
    }

    

    public function AddAdjCategory()

    {

        $inputs = $this->request->all();

        $v = Validator::make($inputs, [

            'title' => 'required',

        ]);



        if($v->fails()){

            return R::ValidationError($v->errors());

        }



        $postData = [

            'title'=> $inputs['title'],

            'status'=> '0',

        ];



        try {

            $data = PostAdCategory::create($postData);



            return R::Success('Category Changed Successfully', $data);



        } catch (Exception $e) {

            DB::rollback();

            return R::SimpleError("Can't save data");  

        }

    }

    

    public function UpdateAdjCategory()

    {

        $inputs = $this->request->all();

        $v = Validator::make($inputs, [

            'title' => 'required',

        ]);



        if($v->fails()){

            return R::ValidationError($v->errors());

        }



        $postData = [

            'title'=> $inputs['title'],

            'status'=> '0',

        ];



        try {

            $data = PostAdCategory::updateOrCreate(['id' => $inputs['id'] ], $postData);



            return R::Success('Category Changed Successfully', $data);



        } catch (Exception $e) {

            DB::rollback();

            return R::SimpleError("Can't save data");  

        }

    }

    # Admin Created Skills

    public function GetAdskills()

    {

        $data = PostAdSkills::get();



        return R::Success('Post Skill', $data);

    }

    public function DeleteAdminSkill($id)
    {
        $data = PostAdSkills::where('id', $id)->delete();
        return R::Success('Post Skill deleted', $data);
    }

    public function AddAdskills()

    {

        $inputs = $this->request->all();

        $v = Validator::make($inputs, [

            'title' => 'required',

        ]);



        if($v->fails()){

            return R::ValidationError($v->errors());

        }



        $postData = [

            'title'=> $inputs['title'],

            'status'=> '0',

        ];



        try {

            $data = PostAdSkills::create($postData);



            return R::Success('Skill Changed Successfully', $data);



        } catch (Exception $e) {

            DB::rollback();

            return R::SimpleError("Can't save data");  

        }

    }

    

    public function UpdateAdskills()

    {

        $inputs = $this->request->all();

        $v = Validator::make($inputs, [

            'title' => 'required',

        ]);



        if($v->fails()){

            return R::ValidationError($v->errors());

        }



        $postData = [

            'title'=> $inputs['title'],

            'status'=> '0',

        ];



        try {

            $data = PostAdSkills::updateOrCreate(['id' => $inputs['id'] ], $postData);



            return R::Success('Skill Changed Successfully', $data);



        } catch (Exception $e) {

            DB::rollback();

            return R::SimpleError("Can't save data");  

        }

    }

    # Admin Created Skills

    # Admin Active Jobs
    

    public function GetAdAjob()

    {

        $data = JobPost::with('postedBy','timeRange','totalOffer')->orderBy('id','DESC')->get();



        return R::Success('Post Job', $data);

    }

    public function DeleteAdminAjob($id)
    {
        $data = JobPost::where('id', $id)->delete();
        return R::Success('Post Job deleted', $data);
    }

    public function AddAdAjob()

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

        $postData = [

            'what_do_you'=> $inputs['what_do_you'],
            'where_do_you'=> $inputs['where_do_you'],
            'required_Date'=> $inputs['required_Date'],
            'required_time_range'=> $inputs['required_time_range'],
            'detail'=> $inputs['detail'],
            'budget'=> $inputs['budget'],
            'status'=> '0',

        ];



        try {

            $data = JobPost::create($postData);



            return R::Success('Job Changed Successfully', $data);



        } catch (Exception $e) {

            DB::rollback();

            return R::SimpleError("Can't save data");  

        }

    }

    

    public function UpdateAdAjob()

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

        $postData = [

            'what_do_you'=> $inputs['what_do_you'],
            'where_do_you'=> $inputs['where_do_you'],
            'required_Date'=> $inputs['required_Date'],
            'required_time_range'=> $inputs['required_time_range'],
            'detail'=> $inputs['detail'],
            'budget'=> $inputs['budget'],
            'status'=> 'OPEN',

        ];



        try {

            $data = JobPost::updateOrCreate(['id' => $inputs['id'] ], $postData);



            return R::Success('Job Changed Successfully', $data);



        } catch (Exception $e) {

            DB::rollback();

            return R::SimpleError("Can't save data");  

        }

    }


    # Admin Awarded Jobs
    

     public function GetAdAwjob()

     {
 
         $data = JobPost::with('postedBy','timeRange','totalOffer')->orderBy('id','DESC')->get();
 
 
 
         return R::Success('Post Job', $data);
 
     }
 
     public function DeleteAdminAwjob($id)
     {
         $data = JobPost::where('id', $id)->delete();
         return R::Success('Post Job deleted', $data);
     }
 
     public function AddAdAwjob()
 
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
 
         $postData = [
 
             'what_do_you'=> $inputs['what_do_you'],
             'where_do_you'=> $inputs['where_do_you'],
             'required_Date'=> $inputs['required_Date'],
             'required_time_range'=> $inputs['required_time_range'],
             'detail'=> $inputs['detail'],
             'budget'=> $inputs['budget'],
             'status'=> '0',
 
         ];
 
 
 
         try {
 
             $data = JobPost::create($postData);
 
 
 
             return R::Success('Job Changed Successfully', $data);
 
 
 
         } catch (Exception $e) {
 
             DB::rollback();
 
             return R::SimpleError("Can't save data");  
 
         }
 
     }
 
     
 
     public function UpdateAdAwjob()
 
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
 
         $postData = [
 
             'what_do_you'=> $inputs['what_do_you'],
             'where_do_you'=> $inputs['where_do_you'],
             'required_Date'=> $inputs['required_Date'],
             'required_time_range'=> $inputs['required_time_range'],
             'detail'=> $inputs['detail'],
             'budget'=> $inputs['budget'],
             'status'=> 'ASSIGNED',
 
         ];
 
 
 
         try {
 
             $data = JobPost::updateOrCreate(['id' => $inputs['id'] ], $postData);
 
 
 
             return R::Success('Job Changed Successfully', $data);
 
 
 
         } catch (Exception $e) {
 
             DB::rollback();
 
             return R::SimpleError("Can't save data");  
 
         }
 
     }
    
    
     # Admin Complted Jobs
     public function allReportedJobList()
     {
        // $data = JobPost::with('postedBy','timeRange','totalOffer')->orderBy('id','DESC')->get();

        $data = JobReport::with('JobPost.postedBy','ReportedBy')->get();
         
        return R::Success('Reported Post Job list', $data);
     }

     public function GetAdcomjob()
     {
         $data = JobPost::with('postedBy','timeRange','totalOffer')->orderBy('id','DESC')->get();

         return R::Success('Post Job', $data);
     }
 
     public function DeleteAdmincomjob($id)
     {
         $data = JobPost::where('id', $id)->delete();
         return R::Success('Post Job deleted', $data);
     }
 
     public function AddAdcomjob()
 
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
 
         $postData = [
 
             'what_do_you'=> $inputs['what_do_you'],
             'where_do_you'=> $inputs['where_do_you'],
             'required_Date'=> $inputs['required_Date'],
             'required_time_range'=> $inputs['required_time_range'],
             'detail'=> $inputs['detail'],
             'budget'=> $inputs['budget'],
             'status'=> '0',
 
         ];
 
 
 
         try {
 
             $data = JobPost::create($postData);
 
 
 
             return R::Success('Job Changed Successfully', $data);
 
 
 
         } catch (Exception $e) {
 
             DB::rollback();
 
             return R::SimpleError("Can't save data");  
 
         }
 
     }
 
     
 
     public function UpdateAdcomjob()
 
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
 
         $postData = [
 
             'what_do_you'=> $inputs['what_do_you'],
             'where_do_you'=> $inputs['where_do_you'],
             'required_Date'=> $inputs['required_Date'],
             'required_time_range'=> $inputs['required_time_range'],
             'detail'=> $inputs['detail'],
             'budget'=> $inputs['budget'],
             'status'=> 'COMPLETED',
 
         ];
 
 
 
         try {
 
             $data = JobPost::updateOrCreate(['id' => $inputs['id'] ], $postData);
 
 
 
             return R::Success('Job Changed Successfully', $data);
 
 
 
         } catch (Exception $e) {
 
             DB::rollback();
 
             return R::SimpleError("Can't save data");  
 
         }
 
     }



      # Admin Site Settings
    

      public function GetAdsettings()

      {
  
          $data = SiteSetting::where('id', 1)->first();
  
  
  
          return R::Success('Post Job', $data);
  
      }

      public function AddAdsettings()
  
      {
  
          $inputs = $this->request->all();
  
          $v = Validator::make($inputs, [
  
              'site_title' => 'site_title',
              'site_footer' => 'site_footer',
              'address' => 'address',
              'mail_host' => 'mail_host',
              'smtp_username' => 'smtp_username',
              'smtp_password' => 'smtp_password',
              'mail_from' => 'mail_from',
              'mailfrom_name' => 'mailfrom_name',
              'mail_enc' => 'mail_enc',
              'mail_port' => 'mail_port',
              'twitter' => 'twitter',
              'facebook' => 'facebook',
              'linkedin' => 'linkedin',
              'instagram' => 'instagram',
  
          ]);
  
  
  
          if($v->fails()){
  
              return R::ValidationError($v->errors());
  
          }
  
          $postData = [
  
              'site_title'=> $inputs['site_title'],
              'site_footer'=> $inputs['site_footer'],
              'address'=> $inputs['address'],
              'mail_host'=> $inputs['mail_host'],
              'smtp_username'=> $inputs['smtp_username'],
              'smtp_password'=> $inputs['smtp_password'],
              'mail_from'=> $inputs['mail_from'],
              'mailfrom_name'=> $inputs['mailfrom_name'],
              'mail_enc'=> $inputs['mail_enc'],
              'mail_port'=> $inputs['mail_port'],
              'twitter'=> $inputs['twitter'],
              'facebook	'=> $inputs['facebook'],
              'linkedin'=> $inputs['linkedin'],
              'instagram'=> $inputs['instagram'],
  
          ];
  
  
  
          try {
  
              $data = JobPost::create($postData);
  
  
  
              return R::Success('Job Changed Successfully', $data);
  
  
  
          } catch (Exception $e) {
  
              DB::rollback();
  
              return R::SimpleError("Can't save data");  
  
          }
  
      }
  
      
  
      public function UpdateAdsettings(Request $request)
      {
          $inputs = $this->request->all();
          if($request->hasFile('site_logo')){
            $completeFileName = $request->file('site_logo')->getClientOriginalName();
            $fileNameOnly = pathinfo($completeFileName, PATHINFO_FILENAME);
            $extenstion = $request->file('site_logo')->getClientOriginalExtension();
            $compPic = str_replace(' ','_',$fileNameOnly).'-'.rand().'_'.time().'.'.$extenstion;
            $path = $request->file('site_logo')->storeAs('public/images',$compPic);
        }
          $postData = [
            'site_title'=> $inputs['site_title'],
            'site_footer'=> $inputs['site_footer'],
            'address'=> $inputs['address'],
            'mail_host'=> $inputs['mail_host'],
            'smtp_username'=> $inputs['smtp_username'],
            'smtp_password'=> $inputs['smtp_password'],
            'mail_from'=> $inputs['mail_from'],
            'mailfrom_name'=> $inputs['mailfrom_name'],
            'mail_enc'=> $inputs['mail_enc'],
            'mail_port'=> $inputs['mail_port'],
            'twitter'=> $inputs['twitter'],
            'facebook'=> $inputs['facebook'],
            'linkedin'=> $inputs['linkedin'],
            'instagram'=> $inputs['instagram'],
            'stripe_publishkey'=> $inputs['stripe_publishkey'],
            'stripe_secretkey'=> $inputs['stripe_secretkey'],
          ]; 
          if($request->hasFile('site_logo')){
            $postData['site_logo'] = $compPic;
          }
          if($postData){
            $data = SiteSetting::updateOrCreate(['id' => 1], $postData);
            return R::Success('Job Changed Successfully', $data);
          }
          else{
            return R::SimpleError("Can't save data"); 
          }
      }

      public function getSettings(){
        $data = SiteSetting::where('id', 1)->first();
        if($data){
            return response()->json([
                'status' => true,
                'data' => $data
            ]);
        }
        else{
            return response()->json([
                'status' => false,
                'data' => $data
            ]);
        }
      }
 
# Display Admin Badges
    
    public function GetAdBadges()
    {
        $data = Badge::get();

        return R::Success('Post Category', $data);
    }

    public function DeleteAdminBadges($id)
    {
        $data = Badge::where('id', $id)->delete();
        return R::Success('Badge deleted', $data);
    }

}


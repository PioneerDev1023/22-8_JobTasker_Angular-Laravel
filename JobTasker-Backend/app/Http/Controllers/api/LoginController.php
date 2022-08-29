<?php



namespace App\Http\Controllers\api;



use App\Http\Controllers\Controller;

use Validator, Auth, DB, Gate, File, ail, Hash,Storage;

use Illuminate\Http\Request;

use App\Http\Helpers\Response as R;

use App\Models\User;
use App\Models\JobPost;
use App\Models\Transactions;

use App\Models\Profile;
use Illuminate\Support\Facades\Mail;
use App\Mail\ForgotEmail;
use App\Mail\GeneralEmail;

use Illuminate\Support\Facades\Password;



class LoginController extends Controller

{

    public function __construct(Request $request)

    {

        $this->request = $request;

    }



    public function login()

    {

        $this->request->validate([

            'email' => 'required|email',

            'password' => 'required'

        ]);



        $user = User::where('email', $this->request->email)->first();



        $user->tokens()->delete();



        if (! $user || ! Hash::check($this->request->password, $user->password)) {

            // throw ValidationException::withMessages([

            //     'email' => ['The provided credentials are incorrect.'],

            // ]);

            return R::SimpleError('The provided credentials are incorrect.');

        }
        if($user->active == 1){
            return R::SimpleError('Please contact support team!');
        }



        $token = $user->createToken($this->request->email)->plainTextToken;



        $user->remember_token = $token;



        $user->save();



        return R::Success($token, $user);

    }



    // Admin Login

    public function AdminLogin()

    {

        $this->request->validate([

            'email' => 'required|email',

            'password' => 'required'

        ]);



        $user = User::where('email', $this->request->email)->first();



        $user->tokens()->delete();



        if (! $user || ! Hash::check($this->request->password, $user->password)) {

            // throw ValidationException::withMessages([

            //     'email' => ['The provided credentials are incorrect.'],

            // ]);

            return R::SimpleError('The provided credentials are incorrect.');

        }



        $token = $user->createToken($this->request->email)->plainTextToken;



        $user->remember_token = $token;



        $user->save();



        return R::Success($token, $user);

    }



    public function loginEmail()

    {

        $this->request->validate([

            'email' => 'required|email'

        ]);



        $user = User::where('email', $this->request->email)->first();



        $user->tokens()->delete();



        // if (! $user || ! Hash::check($this->request->password, $user->password)) {

        //     // throw ValidationException::withMessages([

        //     //     'email' => ['The provided credentials are incorrect.'],

        //     // ]);

        //     return R::SimpleError('The provided credentials are incorrect.');

        // }



        $token = $user->createToken($this->request->email)->plainTextToken;



        $user->remember_token = $token;



        $user->save();



        return R::Success($token, $user);

    }



    public function ForgotPassword()
    {
        $email = $this->request->get('email');
        $user = User::where('email', $this->request->email)->first();
        if($user){
            Mail::to($email)->send(new ForgotEmail);
            return response()->json([
                "status" => true,
                "msg" => "Email Successfully Send!"
            ]);
        }
        else{
            return response()->json([
                "status" => false,
                "msg" => "Please Enter Valid Email!"
            ]);
        }
    }
    
    public function ResetPassword()
    {
        $email = $this->request->get('email');
        $user = User::where('email', $this->request->email)->first();
        if($user){
            $user->password = Hash::make($this->request->password);
            $user->update();
            return response()->json([
                "status" => true,
                "msg" => "Password Change Successfully!"
            ]);
        }
        else{
            return response()->json([
                "status" => false,
                "msg" => "Please Enter Valid Email!"
            ]);
        }
    }

    public function ChangePassword(){
        $old_password = $this->request->get('old_password');
        $new_password = $this->request->get('change_password');
        $user_id = $this->request->get('user_id');
        $user = User::where('id', $user_id)->first();
        if(Hash::check($old_password, $user->password)){
            $user->password = Hash::make($new_password);
            $user->update();

            //Mail::to($user->email)->send(new GeneralEmail(['name' =>$inputs['what_do_you'],'to' =>$user->name],' JobTasker', $msg));

            return response()->json([
                "status" => true,
                "msg" => "Password Change Successfully!"
            ]);
        }
        else{
            return response()->json([
                "status" => false,
                "msg" => "Please Enter Valid Old Password!"
            ]);
        }
    }

    public function user()

    {

        $user = $this->request->user();



        return R::Success('User Detail',$user);

    }



    public function CustomerRegister()

    {

        $inputs = $this->request->all();

        $v = Validator::make($inputs, [

            'email' => 'required|string|max:50',

            'password' => 'required|confirmed',

            'password_confirmation' => 'required',

            'first_name' => 'nullable|string|max:100',

            'last_name' => 'nullable|string|max:100',

            'phone_number' => 'nullable|max:15',

            'postcode' => 'nullable|string|max:15',

            'abn' => 'nullable|string|max:15',

            'state' => 'nullable|string|max:15',

        ]);



        if($v->fails()){

            return R::ValidationError($v->errors());

        }



        $check1 = User::where('email', $inputs['email'])

        // ->whereNotNull('email_verified_at')

        ->count();



        if($check1 > 0){

            return R::SimpleError('Email already exist');

        }



        $user_data = [

            'name' => $inputs['first_name']. " " .$inputs['last_name'],

            'email' => $inputs['email'],

            'password' => Hash::make($inputs['password']),

            'user_type'=>$inputs['user_type'],

        ];



        $role_data = [

            'email' => $inputs['email'],

            'phone_number' => '+' . $inputs['phone_number'],

            'first_name' => $inputs['first_name'],

            'last_name' => $inputs['last_name'],

            'postcode' => $inputs['postcode'],

            'state' => $inputs['state'],

            'abn' => $inputs['abn'],
            'fcm_token' => $inputs['fcm_token'],

        ];



       DB::beginTransaction();

       try {

            $user = User::create($user_data);



            $role_data['id'] = $user->id;



            Profile::create($role_data);



            DB::commit();

            $msg = '<p>Welcome you have been register successfully</p>';
            Mail::to($inputs['email'])->send(new GeneralEmail(['name' =>$inputs['first_name'],'to' =>$inputs['first_name'] . ' ' . $inputs['last_name']],' JobTasker', $msg));

            // if($this->request->hasFile('profile_image')){

            //     $file = $this->request->file('profile_image');

            //     $result = $file->storeAs('images/profile-images/',$user->id);

            // }



            $token = $user->createToken('web')->plainTextToken;



            $userData = User::with('Profile')

            ->where('email', $user->email)

            ->first();

	        $userData['token'] = $token;



            return R::Success('Registered Successfully', $userData);



       } catch (Exception $e) {

         DB::rollback();

         return R::SimpleError("Can't save data");

       }

    }
    public function action_user($id){
        $user = User::find($id);
        if(!$user){
            return response()->json([
                'status' => false,
                'msg'    => 'User not found!'
            ]);
        }
        if($user->active == 1){
            $user->active = 0;
        }
        else{
            $user->active = 1;
        }
        
        $user->update();
        return response()->json([
            'status' => true,
            'msg'    => 'User updated succesfully!'
        ]);
    }
    
    public function GetDashboardDetails(){
        // $user_counter = DB::table('users')
        //     ->selectRaw('(select count(*) from users where user_type = "poster") as posters')
        //     ->selectRaw('(select count(*) from users where user_type = "tasker") as taskers')
        //     ->first();
        // $projects = DB::table('job_posts')
        //     ->selectRaw('(select count(*) from job_posts where status = "OPEN") as open_projects')
        // ->first();
        // if($user_counter){
        //     return response()->json([
        //         'status' => true,
        //         'user_counter' =>$user_counter,
        //         'projects'  => $projects
        //     ]);
        // }
        // else{
        //     return response()->json([
        //         'status' => false,
        //     ]);
        // }

        $total_poster = User::where('user_type','poster')->get()->count();
        $total_tasker = User::where('user_type','tasker')->get()->count();
        $total_project = JobPost::get()->count();
        $total_Milestones = Transactions::get()->count();

        $data = [
            "tposter" => $total_poster,
            "ttasker" => $total_tasker,
            "tproject" => $total_project,
            "tmilestones" => $total_Milestones,
        ];

        return R::Success('Dashboard Data', $data);
    
    }

}


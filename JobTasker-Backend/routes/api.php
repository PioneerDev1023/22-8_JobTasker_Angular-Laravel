<?php



use Illuminate\Http\Request;

use Illuminate\Support\Facades\Route;



/*

|--------------------------------------------------------------------------

| API Routes

|--------------------------------------------------------------------------

|

| Here is where you can register API routes for your application. These

| routes are loaded by the RouteServiceProvider within a group which

| is assigned the "api" middleware group. Enjoy building your API!

|

*/

Route::get('/storage-link', function() {
    $output = [];
    \Artisan::call('storage:link', $output);
    dd($output);
});

#public list

Route::post('/login','LoginController@login');

Route::post('/loginemail','LoginController@loginEmail');

Route::post('/register','LoginController@CustomerRegister');

Route::post('/forgot-password','LoginController@ForgotPassword');
Route::post('/reset-password','LoginController@ResetPassword');
Route::post('/change-password','LoginController@ChangePassword');
Route::get('/get-dashboard-details','LoginController@GetDashboardDetails');

Route::get('/get-posts', 'PostController@Get');

Route::get('/get-posts-image/{image}', 'PostController@PostImage');
Route::get('/get-profile-image/{image}', 'ProfileController@ProfileImage');
Route::get('/getprofileimage/{id}', 'ProfileController@ProfileImageById');
Route::get('/getjobpostimage/{id}', 'JobpostController@JobPostImage');

Route::get('/get-posts-detail/{id}', 'PostController@GetDetail');
Route::get('/get-tasker-by-category', 'PublicListController@TaskerByCategory');

Route::get('/send-all-message', 'PublicListController@SendMessage');
Route::get('/posts/get-settings', 'PostController@getSettings');
Route::get('/portfolio-image/{id}', 'ProfileController@PortfolioImage');
Route::get('/badge-image/{id}', 'ProfileController@BadgeImage');





//Route::get('/profile', 'ProfileController@Profile');


# Admin Login

Route::post('/adminlogin','LoginController@AdminLogin');
Route::get('/action_user/{id}','LoginController@action_user');


// Password reset routes...

Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.request');

Route::post('password/reset', 'Auth\ResetPasswordController@postReset')->name('password.reset');



#Job Post

Route::get('/get-job-list','JobpostController@GetPostList');

Route::get('/get-job/{id}','JobpostController@GetPost');

#Job Post Searchs
Route::get('/get-job-list-price-high-low','JobpostController@GetPostListHeightLow');
Route::get('/get-job-list-price-low-high','JobpostController@GetPostListLowHeight');
Route::get('/get-job-list-price-due-dateearliest','JobpostController@GetPostListDueDateEarly');
Route::get('/get-job-list-price-due-datelast','JobpostController@GetPostListDueDateLast');
Route::get('/get-job-list-old-task','JobpostController@GetPostListOldDest');
Route::get('/get-job-list-closest-to-me','JobpostController@GetPostListCloseToMe');




#Other Listing

Route::get('/skill-list','PublicListController@SkillList');
Route::get('/category-list','PublicListController@CategoryList');


Route::fallback(function () {

    return response()->json(['success' => false, 'data' => 'error', 'msg' => 'Not Found!'], 404);

});



Route::group(['middleware' => 'auth:sanctum'], function() {

    //Route::get('/user', 'LoginController@user');

    # Job Post
    Route::post('/job-post', 'JobpostController@JobPost');
    Route::post('/job-offer', 'JobpostController@ReceiverOffer');
    Route::post('/job-question', 'JobpostController@ReceiverQuestion');
    Route::post('/job-report', 'ProfileController@addPostReport');
    Route::get('/adAcomjobs/job-report-list', 'PostController@allReportedJobList');

    # Profile
    Route::get('/profile', 'ProfileController@Profile');
    Route::get('/my-bank', 'ProfileController@getBank');
    Route::post('/tasker-bank', 'ProfileController@addBank');
    Route::post('/update-tasker-bank', 'ProfileController@updateBank');

    # Portfolio

    Route::get('/portfolio', 'ProfileController@Portfolio');
    Route::get('/my-portfolio', 'ProfileController@getPortfolio');
    Route::post('/tasker-portfolio', 'ProfileController@addPortfolio');
    Route::post('/update-tasker-portfolio', 'ProfileController@updatePortfolio');

    # Badges

    Route::get('/badges', 'ProfileController@Badge');
    Route::get('/change-badge-status/{id}', 'ProfileController@ChangeBadgeStatus');
    Route::get('/all-badges', 'ProfileController@allBadges');
    Route::get('/my-badges', 'ProfileController@getBadges');
    Route::post('/tasker-badges', 'ProfileController@addBadges');
    Route::post('/update-tasker-badges', 'ProfileController@updateBadges');

    # Display Badges To Admin

    Route::get('/adminget-Badges', 'PostController@GetAdBadges');
    Route::post('/adminupdate-Badges', 'PostController@UpdateAdBadges');
    Route::get('/admindelete-Badges/{id}', 'PostController@DeleteAdminBadges');

     # Display Badges To Admin Ends

    Route::post('/update-profile', 'ProfileController@updateProfile');

    Route::get('/my-job-post', 'ProfileController@MyJobList');
    Route::get('/my-job-post-completed', 'ProfileController@MyJobListCompleted');
    Route::get('/my-job-post-completed-poster', 'ProfileController@MyJobListCompletedPoster');
    Route::get('/my-job-post-offer/{id}', 'ProfileController@GetMyJobOffer');
    Route::post('/assign-job', 'ProfileController@AssignJob');   
    
    # Completed Job list for tasker

    Route::post('/completed-job', 'ProfileController@TCompletedJob');

    # Completed Job list for ends

    Route::get('/my-tasker-job', 'ProfileController@MyTaskerJob');
    Route::post('/payment-request', 'ProfileController@PaymentRequest');
    Route::post('/skill-update', 'ProfileController@UpdateSkill');
    Route::post('/category-update', 'ProfileController@UpdateCategory');
    Route::get('/my-skill', 'ProfileController@MySkills');
    Route::get('/my-category', 'ProfileController@MyCategory');
    Route::get('/get-bank-detail/{id}', 'ProfileController@GetBankDetail');



    #Stripe

    Route::post('/add-payment-method', 'ProfileController@AddPaymentMethod');

    Route::get('/get-payment-methods', 'ProfileController@MyPaymentMethod');

    Route::post('/paid-tran', 'ProfileController@Payment');

    Route::get('/get-payment-tran', 'ProfileController@TransectionDetail');
    Route::get('/get-payment-tran-release', 'ProfileController@TransectionDetailRelesed');
    Route::get('/get-payment-tran-rejected', 'ProfileController@TransectionDetailRejected');

    Route::get('/get-my-payment-tran', 'ProfileController@MyTransectionDetail');
    Route::get('/get-my-receive-tran', 'ProfileController@MyRecTransectionDetail');

    Route::post('/set-release', 'ProfileController@SetRelease');
    Route::post('/set-reject', 'ProfileController@SetReject');
    Route::post('/add_review', 'ProfileController@addReview');
    Route::post('/add_tasker_review', 'ProfileController@addTaskerReview');
    Route::get('/get_reviews/{id}', 'ProfileController@getReviews');
    Route::get('/get_tasker_reviews/{id}', 'ProfileController@getTaskerReviews');
    Route::get('/get_poster_reviews/{id}', 'ProfileController@getPosterReviews');
    Route::get('/list_tasker_reviews', 'ProfileController@listTaskerReviews');
    Route::get('/list_poster_reviews', 'ProfileController@listPosterReviews');
    Route::get('/del_poster_review/{id}', 'ProfileController@delPosterReview');
    Route::get('/del_tasker_review/{id}', 'ProfileController@delTaskerReview');


    # Dispute

    Route::post('/create-dispute', 'ProfileController@CreateDispute');

    Route::get('/get-dispute-by-me', 'ProfileController@getMyDispute');

    Route::get('/get-dispute-againest-me', 'ProfileController@getDisputeAgainestMe');



    # Blogs

    Route::post('/add-comment', 'PostController@PostComment');



    # Adding Predata

    Route::post('/add-new-skill', 'ProfileController@addSkill');



    Route::post('/complete-job', 'ProfileController@CompleteJob');



    # Admin

    Route::get('/posts/get', 'PostController@Get');

    Route::delete('/posts/delete-post/{id}', 'PostController@DeletePost');

    Route::post('/posts/add-update', 'PostController@Update');

    Route::get('/posts/get-category', 'PostController@GetCategory');

    Route::post('/posts/add-category', 'PostController@AddCategory');

    Route::post('/posts/update-category', 'PostController@UpdateCategory');

    # Admin Job Categories
    Route::get('/acat/adminget-jcategory', 'PostController@GetAdjCategory');

    Route::post('/acat/adminadd-jcategory', 'PostController@AddAdjCategory');

    Route::post('/acat/adminupdate-jcategory', 'PostController@UpdateAdjCategory');

    Route::get('/acat/admindelete-cat/{id}', 'PostController@DeleteAdminCat');

    # Admin Active Jobs

    Route::get('/adAjobs/adminget-actjob', 'PostController@GetAdAjob');

    Route::post('/adAjobs/adminadd-actjob', 'PostController@AddAdAjob');

    Route::post('/adAjobs/adminupdate-actjob', 'PostController@UpdateAdAjob');

    Route::get('/adAjobs/admindelete-actjob/{id}', 'PostController@DeleteAdminAjob');

    # Admin Awarded Jobs

    Route::get('/adAwjobs/adminget-awdjob', 'PostController@GetAdAwjob');

    Route::post('/adAwjobs/adminadd-awdjob', 'PostController@AddAdAwjob');

    Route::post('/adAwjobs/adminupdate-awdjob', 'PostController@UpdateAdAwjob');

    Route::get('/adAwjobs/admindelete-awdjob/{id}', 'PostController@DeleteAdminAwjob');

    # Admin Completed Jobs

    Route::get('/adAcomjobs/adminget-comjob', 'PostController@GetAdcomjob');

    Route::post('/adAcomjobs/adminadd-comjob', 'PostController@AddAdcomjob');

    Route::post('/adAcomjobs/adminupdate-comjob', 'PostController@UpdateAdcomjob');

    Route::get('/adAcomjobs/admindelete-comjob/{id}', 'PostController@DeleteAdmincomjob');

    # Admin Skills

    Route::get('/askills/adminget-skills', 'PostController@GetAdskills');

    Route::post('/askills/adminadd-skills', 'PostController@AddAdskills');

    Route::post('/askills/adminupdate-skills', 'PostController@UpdateAdskills');
    
    Route::get('/askills/admindelete-skill/{id}', 'PostController@DeleteAdminSkill');

    # Admin Site Settings

    Route::get('/asettings/adminget-settings', 'PostController@GetAdsettings');

   // Route::post('/asettings/adminadd-settings', 'PostController@AddAdsettings');

    Route::post('/posts/add-settings', 'PostController@UpdateAdsettings');

    # Admin Skills Ends

    Route::get('/get-tasker-info', 'ProfileController@getTaskerInfo');

    Route::get('/get-poster-info', 'ProfileController@getPosterInfo');

    Route::get('/get-dispute-info', 'ProfileController@getDisputeInfo');

    Route::post('/update-dispute', 'ProfileController@UpdateDispute');

    #admin
    Route::get('/get-admin', 'ProfileController@getAdmin');

    Route::post('/update-admin', 'ProfileController@UpdateAdmin');



});





// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {

//     return $request->user();

// });


<?php


	if (!function_exists('isAgency')) {
		function isAgency()
		{
			if(!Auth::check()){
				return false;
			}

			return Auth::user()->isAgency();
		}
	}

	if (!function_exists('isCustomer')) {
		function isCustomer()
		{
			if(!Auth::check()){
				return false;
			}

			return Auth::user()->isCustomer();
		}
	}

	if (!function_exists('isAdmin')) {
		function isAdmin()
		{
			if(!Auth::check()){
				return false;
			}

			return Auth::user()->isAdmin();
		}
	}

	if (!function_exists('isShipper')) {
		function isShipper()
		{
			if(!Auth::check()){
				return false;
			}

			return Auth::user()->isShipper();
		}
	}

	if (!function_exists('isGuest')) {
		function isGuest()
		{
			if(!Auth::check()){
				return true;
			} else {
				return false;
			}
		}
	}
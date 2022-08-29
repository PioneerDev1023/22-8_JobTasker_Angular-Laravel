export class MenuService {

  public static adminmenu = [
    {
      title: 'Dashboard',
      link: '/',
      icon: ' fas fa-tachometer-alt',
      type: 'main',
      active: true
    },
    {
      title: 'Pages',
      link: 'no',
      icon: ' fas fa-list',
      type: 'dropdown',
      active: false,
      submenu: [
        {
          title: 'Brand',
          link: '/rows/44',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
        {
          title: 'History',
          link: '/cars',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
        {
          title: 'R&D',
          link: '/rnd/46',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
        {
          title: 'About Us',
          link: '/cars',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
        {
          title: 'Contact Us',
          link: '/contact-us',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
        {
          title: 'Community Guidelines',
          link: '/guidelines',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
        {
          title: 'Tasker Community Guidelines',
          link: '/tasker-guidelines',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
        {
          title: 'Poster Community Guidelines',
          link: '/poster-guidelines',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
        {
          title: 'Cars',
          link: '/cars',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
        {
          title: 'Locations',
          link: '/cars',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
        {
          title: 'News & Events',
          link: '/newsevents',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
        {
          title: 'Job',
          link: '/job',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
      ]
    },
    {
      title: 'After Sales Service',
      link: 'no',
      icon: ' fas fa-list',
      type: 'dropdown',
      active: false,
      submenu: [
        {
          title: ' Our Promise ',
          link: '/cars',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
        {
          title: ' Warranty ',
          link: '/cars',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
        {
          title: 'Roadside Assistance',
          link: '/cars',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
        {
          title: 'Service Schedule',
          link: '/cars',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
        {
          title: 'Book a Service',
          link: '/cars',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
      ]
    },
    {
      title: 'Website Setting',
      link: 'no',
      icon: ' fas fa-list',
      type: 'dropdown',
      active: false,
      submenu: [
        {
          title: 'Social Links',
          link: '/cars',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
        {
          title: 'Header Setting',
          link: '/cars',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
      ]
    },
    {
      title: 'Reports',
      link: 'no',
      icon: ' fas fa-list',
      type: 'dropdown',
      active: false,
      submenu: [
        {
          title: 'All Leads',
          link: '/leads',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
        
      ]
    },
  ];

  public static menu = [
    {
      title: 'Dashboard',
      link: '/',
      icon: ' fas fa-tachometer-alt',
      type: 'main',
      active: true
    },
    {
      title: 'Pre data',
      link: 'no',
      icon: ' fas fa-list',
      type: 'dropdown',
      active: false,
      submenu: [
        {
          title: 'Contact Details',
          link: '/contact',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
        {
          title: 'Comapny/Vendors',
          link: '/company',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
        {
          title: 'Items',
          link: '/items',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        }
      ]
    },
    {
      title: 'Accounts',
      link: 'no',
      icon: ' fas fa-list',
      type: 'dropdown',
      active: false,
      submenu: [
        {
          title: 'Account',
          link: '/accounts',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
        {
          title: 'Bank',
          link: '/bank',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
        // {
        //   title: 'Designation',
        //   link: '/designation',
        //   icon: ' far fa-circle',
        //   type: 'main',
        //   active: false,
        //   newPage: false
        // },
        // {
        //   title: 'Employee',
        //   link: '/employee',
        //   icon: ' far fa-circle',
        //   type: 'main',
        //   active: false,
        //   newPage: false
        // }
      ]
    },
    {
      title: 'procurement',
      link: 'no',
      icon: ' fas fa-list',
      type: 'dropdown',
      active: false,
      submenu: [
        {
          title: 'procurement',
          link: '/procurement',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        }
      ]
    },
    {
      title: 'HR',
      link: 'no',
      icon: ' fas fa-list',
      type: 'dropdown',
      active: false,
      submenu: [
        {
          title: 'Departmant',
          link: '/department',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
        {
          title: 'Designation',
          link: '/designation',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
        {
          title: 'Employee',
          link: '/employee',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
        {
          title: 'Salary',
          link: '/employee/salary',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
        {
          title: 'Attendance',
          link: '/attendance',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
        {
          title: 'Attendance Report',
          link: '/attendancereport',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        }
      ]
    },
    // {
    //   title: 'Chat',
    //   link: 'no',
    //   icon: ' fas fa-list',
    //   type: 'dropdown',
    //   active: false,
    //   submenu: [
    //     {
    //       title: 'Chat',
    //       link: '/chat',
    //       icon: ' far fa-circle',
    //       type: 'main',
    //       active: false
    //     }
    //   ]
    // },
    {
      title: 'Society',
      link: 'no',
      icon: ' fas fa-list',
      type: 'dropdown',
      active: false,
      submenu: [
        {
          title: 'List',
          link: '/society',
          icon: ' far fa-circle',
          type: 'main',
          active: false
        },
        {
          title: 'Plan',
          link: '/plan',
          icon: ' far fa-circle',
          type: 'main',
          active: false
        },
        {
          title: 'Feature',
          link: '/feature',
          icon: ' far fa-circle',
          type: 'main',
          active: false
        }
      ]
    },
    // {
    //   title: 'Property',
    //   link: 'no',
    //   icon: ' fas fa-list',
    //   type: 'dropdown',
    //   active: false,
    //   submenu: [
    //     {
    //       title: 'All Property',
    //       link: '/property',
    //       icon: ' far fa-circle',
    //       type: 'main',
    //       active: false
    //     },
    //     {
    //       title: 'Registered Client',
    //       link: '/regclient',
    //       icon: ' far fa-circle',
    //       type: 'main',
    //       active: false
    //     }
    //   ]
    // },
    {
      title: 'Reg',
      link: 'no',
      icon: ' fas fa-list',
      type: 'dropdown',
      active: false,
      submenu: [
        {
          title: 'All Client',
          link: '/clients/all',
          icon: ' far fa-circle',
          type: 'main',
          active: false
        },
        {
          title: 'First Info',
          link: '/clients',
          icon: ' far fa-circle',
          type: 'main',
          active: false
        },
        {
          title: 'My Calls',
          link: '/mycall',
          icon: ' far fa-circle',
          type: 'main',
          active: false
        },
        {
          title: 'Feedback',
          link: '/clients/feedback',
          icon: ' far fa-circle',
          type: 'main',
          active: false
        }
      ]
    },
    {
      title: 'Project',
      link: 'no',
      icon: ' fas fa-list',
      type: 'dropdown',
      active: false,
      submenu: [
        {
          title: 'Expense Type',
          link: '/expensetype',
          icon: ' far fa-circle',
          type: 'main',
          active: false
        },
        {
          title: 'Projects',
          link: '/project',
          icon: ' far fa-circle',
          type: 'main',
          active: false
        }
      ]
    },
    {
      title: 'Reports',
      link: 'no',
      icon: ' fas fa-list',
      type: 'dropdown',
      active: false,
      submenu: [
        {
          title: 'Accounts',
          link: '/reports',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        }
      ]
    },
    {
      title: 'Expense',
      link: 'no',
      icon: ' fas fa-list',
      type: 'dropdown',
      active: false,
      submenu: [
        {
          title: 'Expense',
          link: '/expense',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
        {
          title: 'Expense Voucher',
          link: '/expensevoucher',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        }
      ]
    },
  ];

  public static accounts = [
    {
      title: 'Dashboard',
      link: '/',
      icon: ' fas fa-tachometer-alt',
      type: 'main',
      active: true
    },
    {
      title: 'Pre data',
      link: 'no',
      icon: ' fas fa-list',
      type: 'dropdown',
      active: false,
      submenu: [
        {
          title: 'Contact Details',
          link: '/contact',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
        {
          title: 'Comapny/Vendors',
          link: '/company',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
        {
          title: 'Items',
          link: '/items',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        }
      ]
    },
    {
      title: 'Accounts',
      link: 'no',
      icon: ' fas fa-list',
      type: 'dropdown',
      active: false,
      submenu: [
        {
          title: 'Bank',
          link: '/bank',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
        // {
        //   title: 'Designation',
        //   link: '/designation',
        //   icon: ' far fa-circle',
        //   type: 'main',
        //   active: false,
        //   newPage: false
        // },
        // {
        //   title: 'Employee',
        //   link: '/employee',
        //   icon: ' far fa-circle',
        //   type: 'main',
        //   active: false,
        //   newPage: false
        // }
      ]
    },
    // {
    //   title: 'HR',
    //   link: 'no',
    //   icon: ' fas fa-list',
    //   type: 'dropdown',
    //   active: false,
    //   submenu: [
    //     {
    //       title: 'Departmant',
    //       link: '/department',
    //       icon: ' far fa-circle',
    //       type: 'main',
    //       active: false,
    //       newPage: false
    //     },
    //     {
    //       title: 'Designation',
    //       link: '/designation',
    //       icon: ' far fa-circle',
    //       type: 'main',
    //       active: false,
    //       newPage: false
    //     },
    //     {
    //       title: 'Employee',
    //       link: '/employee',
    //       icon: ' far fa-circle',
    //       type: 'main',
    //       active: false,
    //       newPage: false
    //     }
    //   ]
    // },
    {
      title: 'Chat',
      link: 'no',
      icon: ' fas fa-list',
      type: 'dropdown',
      active: false,
      submenu: [
        {
          title: 'Chat',
          link: '/chat',
          icon: ' far fa-circle',
          type: 'main',
          active: false
        }
      ]
    },
    // {
    //   title: 'Society',
    //   link: 'no',
    //   icon: ' fas fa-list',
    //   type: 'dropdown',
    //   active: false,
    //   submenu: [
    //     {
    //       title: 'List',
    //       link: '/society',
    //       icon: ' far fa-circle',
    //       type: 'main',
    //       active: false
    //     },
    //     {
    //       title: 'Plan',
    //       link: '/plan',
    //       icon: ' far fa-circle',
    //       type: 'main',
    //       active: false
    //     },
    //     {
    //       title: 'Feature',
    //       link: '/feature',
    //       icon: ' far fa-circle',
    //       type: 'main',
    //       active: false
    //     }
    //   ]
    // },
    // {
    //   title: 'Property',
    //   link: 'no',
    //   icon: ' fas fa-list',
    //   type: 'dropdown',
    //   active: false,
    //   submenu: [
    //     {
    //       title: 'All Property',
    //       link: '/property',
    //       icon: ' far fa-circle',
    //       type: 'main',
    //       active: false
    //     },
    //     {
    //       title: 'Registered Client',
    //       link: '/regclient',
    //       icon: ' far fa-circle',
    //       type: 'main',
    //       active: false
    //     }
    //   ]
    // },
    // {
    //   title: 'Reg',
    //   link: 'no',
    //   icon: ' fas fa-list',
    //   type: 'dropdown',
    //   active: false,
    //   submenu: [
    //     {
    //       title: 'All Client',
    //       link: '/clients/all',
    //       icon: ' far fa-circle',
    //       type: 'main',
    //       active: false
    //     },
    //     {
    //       title: 'First Info',
    //       link: '/clients',
    //       icon: ' far fa-circle',
    //       type: 'main',
    //       active: false
    //     },
    //     {
    //       title: 'My Calls',
    //       link: '/mycall',
    //       icon: ' far fa-circle',
    //       type: 'main',
    //       active: false
    //     },
    //     {
    //       title: 'Feedback',
    //       link: '/clients/feedback',
    //       icon: ' far fa-circle',
    //       type: 'main',
    //       active: false
    //     }
    //   ]
    // },
    // {
    //   title: 'Project',
    //   link: 'no',
    //   icon: ' fas fa-list',
    //   type: 'dropdown',
    //   active: false,
    //   submenu: [
    //     {
    //       title: 'Expense Type',
    //       link: '/expensetype',
    //       icon: ' far fa-circle',
    //       type: 'main',
    //       active: false
    //     },
    //     {
    //       title: 'Projects',
    //       link: '/project',
    //       icon: ' far fa-circle',
    //       type: 'main',
    //       active: false
    //     }
    //   ]
    // },
    {
      title: 'Reports',
      link: 'no',
      icon: ' fas fa-list',
      type: 'dropdown',
      active: false,
      submenu: [
        {
          title: 'Accounts',
          link: '/reports',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        }
      ]
    },
    {
      title: 'Expense',
      link: 'no',
      icon: ' fas fa-list',
      type: 'dropdown',
      active: false,
      submenu: [
        {
          title: 'Expense',
          link: '/expense',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
        {
          title: 'Expense Voucher',
          link: '/expensevoucher',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        }
      ]
    },
  ];

  public static CO = [
    {
      title: 'Dashboard',
      link: '/',
      icon: ' fas fa-tachometer-alt',
      type: 'main',
      active: true
    },
    {
      title: 'Pre data',
      link: 'no',
      icon: ' fas fa-list',
      type: 'dropdown',
      active: false,
      submenu: [
        {
          title: 'Contact Details',
          link: '/contact',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
        {
          title: 'Comapny/Vendors',
          link: '/company',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        },
        {
          title: 'Items',
          link: '/items',
          icon: ' far fa-circle',
          type: 'main',
          active: false,
          newPage: false
        }
      ]
    },
    // {
    //   title: 'Accounts',
    //   link: 'no',
    //   icon: ' fas fa-list',
    //   type: 'dropdown',
    //   active: false,
    //   submenu: [
    //     {
    //       title: 'Bank',
    //       link: '/bank',
    //       icon: ' far fa-circle',
    //       type: 'main',
    //       active: false,
    //       newPage: false
    //     }
    //   ]
    // },
    // {
    //   title: 'HR',
    //   link: 'no',
    //   icon: ' fas fa-list',
    //   type: 'dropdown',
    //   active: false,
    //   submenu: [
    //     {
    //       title: 'Departmant',
    //       link: '/department',
    //       icon: ' far fa-circle',
    //       type: 'main',
    //       active: false,
    //       newPage: false
    //     },
    //     {
    //       title: 'Designation',
    //       link: '/designation',
    //       icon: ' far fa-circle',
    //       type: 'main',
    //       active: false,
    //       newPage: false
    //     },
    //     {
    //       title: 'Employee',
    //       link: '/employee',
    //       icon: ' far fa-circle',
    //       type: 'main',
    //       active: false,
    //       newPage: false
    //     }
    //   ]
    // },
    {
      title: 'Chat',
      link: 'no',
      icon: ' fas fa-list',
      type: 'dropdown',
      active: false,
      submenu: [
        {
          title: 'Chat',
          link: '/chat',
          icon: ' far fa-circle',
          type: 'main',
          active: false
        }
      ]
    },
    // {
    //   title: 'Society',
    //   link: 'no',
    //   icon: ' fas fa-list',
    //   type: 'dropdown',
    //   active: false,
    //   submenu: [
    //     {
    //       title: 'List',
    //       link: '/society',
    //       icon: ' far fa-circle',
    //       type: 'main',
    //       active: false
    //     },
    //     {
    //       title: 'Plan',
    //       link: '/plan',
    //       icon: ' far fa-circle',
    //       type: 'main',
    //       active: false
    //     },
    //     {
    //       title: 'Feature',
    //       link: '/feature',
    //       icon: ' far fa-circle',
    //       type: 'main',
    //       active: false
    //     }
    //   ]
    // },
    // {
    //   title: 'Property',
    //   link: 'no',
    //   icon: ' fas fa-list',
    //   type: 'dropdown',
    //   active: false,
    //   submenu: [
    //     {
    //       title: 'All Property',
    //       link: '/property',
    //       icon: ' far fa-circle',
    //       type: 'main',
    //       active: false
    //     },
    //     {
    //       title: 'Registered Client',
    //       link: '/regclient',
    //       icon: ' far fa-circle',
    //       type: 'main',
    //       active: false
    //     }
    //   ]
    // },
    {
      title: 'Reg',
      link: 'no',
      icon: ' fas fa-list',
      type: 'dropdown',
      active: false,
      submenu: [
        // {
        //   title: 'All Client',
        //   link: '/clients/all',
        //   icon: ' far fa-circle',
        //   type: 'main',
        //   active: false
        // },
        {
          title: 'First Info',
          link: '/clients',
          icon: ' far fa-circle',
          type: 'main',
          active: false
        },
        {
          title: 'My Calls',
          link: '/mycall',
          icon: ' far fa-circle',
          type: 'main',
          active: false
        },
        {
          title: 'Feedback',
          link: '/clients/feedback',
          icon: ' far fa-circle',
          type: 'main',
          active: false
        }
      ]
    },
    // {
    //   title: 'Project',
    //   link: 'no',
    //   icon: ' fas fa-list',
    //   type: 'dropdown',
    //   active: false,
    //   submenu: [
    //     {
    //       title: 'Expense Type',
    //       link: '/expensetype',
    //       icon: ' far fa-circle',
    //       type: 'main',
    //       active: false
    //     },
    //     {
    //       title: 'Projects',
    //       link: '/project',
    //       icon: ' far fa-circle',
    //       type: 'main',
    //       active: false
    //     }
    //   ]
    // },
    // {
    //   title: 'Reports',
    //   link: 'no',
    //   icon: ' fas fa-list',
    //   type: 'dropdown',
    //   active: false,
    //   submenu: [
    //     {
    //       title: 'Reports',
    //       link: '/reports',
    //       icon: ' far fa-circle',
    //       type: 'main',
    //       active: false,
    //       newPage: false
    //     }
    //   ]
    // },
    // {
    //   title: 'Expense',
    //   link: 'no',
    //   icon: ' fas fa-list',
    //   type: 'dropdown',
    //   active: false,
    //   submenu: [
    //     {
    //       title: 'Expense',
    //       link: '/expense',
    //       icon: ' far fa-circle',
    //       type: 'main',
    //       active: false,
    //       newPage: false
    //     },
    //     {
    //       title: 'Expense Voucher',
    //       link: '/expensevoucher',
    //       icon: ' far fa-circle',
    //       type: 'main',
    //       active: false,
    //       newPage: false
    //     }
    //   ]
    // },
  ];

  // public static menu = [
  //   {
  //     title: 'Dashboard',
  //     link: '/',
  //     icon: ' fas fa-tachometer-alt',
  //     type: 'main',
  //     active: true
  //   },
  //   {
  //     title: 'Inventory',
  //     link: 'no',
  //     icon: ' fas fa-list',
  //     type: 'dropdown',
  //     active: false,
  //     submenu: [
  //       {
  //         title: 'Items',
  //         link: '/items',
  //         icon: ' far fa-circle',
  //         type: 'main',
  //         active: false,
  //         newPage: false
  //       },
  //       {
  //         title: 'Vendors',
  //         link: '/vendors',
  //         icon: ' far fa-circle',
  //         type: 'main',
  //         active: false,
  //         newPage: false
  //       },
  //       {
  //         title: 'Client',
  //         link: '/clients',
  //         icon: ' far fa-circle',
  //         type: 'main',
  //         active: false,
  //         newPage: false
  //       }
  //     ]
  //   },
  //   {
  //     title: 'Purchase',
  //     link: 'no',
  //     icon: ' fas fa-list',
  //     type: 'dropdown',
  //     active: false,
  //     submenu: [
  //       {
  //         title: 'Purchase list',
  //         link: '/purchases',
  //         icon: ' far fa-circle',
  //         type: 'main',
  //         active: false,
  //         newPage: false
  //       }
  //     ]
  //   },
  //   {
  //     title: 'Sale',
  //     link: 'no',
  //     icon: ' fas fa-list',
  //     type: 'dropdown',
  //     active: false,
  //     submenu: [
  //       {
  //         title: 'New Sale',
  //         link: '/usersale',
  //         icon: ' far fa-circle',
  //         type: 'main',
  //         active: false,
  //         newPage: true
  //       },
  //       {
  //         title: 'Sale list',
  //         link: '/sale',
  //         icon: ' far fa-circle',
  //         type: 'main',
  //         active: false,
  //         newPage: false
  //       }
  //     ]
  //   },
  //   {
  //     title: 'Chat',
  //     link: 'no',
  //     icon: ' fas fa-list',
  //     type: 'dropdown',
  //     active: false,
  //     submenu: [
  //       {
  //         title: 'Chat',
  //         link: '/chat',
  //         icon: ' far fa-circle',
  //         type: 'main',
  //         active: false
  //       }
  //     ]
  //   },
  //   {
  //     title: 'Reports',
  //     link: 'no',
  //     icon: ' fas fa-list',
  //     type: 'dropdown',
  //     active: false,
  //     submenu: [
  //       {
  //         title: 'Reports',
  //         link: '/reports',
  //         icon: ' far fa-circle',
  //         type: 'main',
  //         active: false,
  //         newPage: false
  //       }
  //     ]
  //   },
  //   {
  //     title: 'Expense',
  //     link: 'no',
  //     icon: ' fas fa-list',
  //     type: 'dropdown',
  //     active: false,
  //     submenu: [
  //       {
  //         title: 'Expense',
  //         link: '/expense',
  //         icon: ' far fa-circle',
  //         type: 'main',
  //         active: false,
  //         newPage: false
  //       },
  //       {
  //         title: 'Expense Voucher',
  //         link: '/expensevoucher',
  //         icon: ' far fa-circle',
  //         type: 'main',
  //         active: false,
  //         newPage: false
  //       }
  //     ]
  //   },
  // ];

}

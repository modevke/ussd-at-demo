import UssdMenuBuilder from 'ussd-menu-builder'
import {menuPicker as menuService} from './menu-picker'
import { fetchHomeHouseholderInsurance, fetchHomeHouseholderInsuranceID, fetchThirdPartyMotor, fetchThirdPartyMotorByID } from './operations/general.Insurance';

export let menu = new UssdMenuBuilder()

// SET UP SESSION
let sessions = {};
menu.sessionConfig({
    start: function (sessionId, key) {
        return new Promise((resolve, reject) => {
            if (!(sessionId in sessions)) sessions[sessionId] = {};
            resolve("");
        });
    },
    set: (sessionId, key, value, callback) => {
        // store key-value pair in current session
        return new Promise((resolve, reject) => {
            sessions[sessionId][key] = value;
            callback();
        });
    },
    get: function (sessionId, key) {
        return new Promise((resolve, reject) => {
            let value = sessions[sessionId][key];
            resolve(value);
        });
    },
    end: function (sessionId, callback) {
        // clear current session
        // this is called by menu.end()
        return new Promise((resolve, reject) => {
            delete sessions[sessionId];
            callback();
        });
    }
});

menu.startState({
  run: () => {
    menu.con(menuService.getMenu('user_exists', '1'))
  },
  next: menuService.getMenuTags('user_exists', '1')
});
 
menu.state('back_to_main', {
    run: () => {
      // CLEAR SESSION
      menu.session.set('route', null)
      menu.session.set('route-sub', null)
      menu.session.set('route-sub-id', null)
      menu.session.set('route-id', null)
      menu.con(menuService.getMenu('choose_service', '2'))
    },
    next: menuService.getMenuTags('choose_service', '2')
});

menu.state('entry.pin', {
    run: () => {
      menu.con(menuService.getMenu('choose_service', '2'))
    },
    next: menuService.getMenuTags('choose_service', '2')
});

// menu.state('insure', {
//   run: () => {
//       menu.con(menuService.getMenu('insure', '3'))
//   },
//   next: menuService.getMenuTags('insure', '3')
// });
// menu.state('invest', {
//   run: () => {
//       menu.con(menuService.getMenu('invest', '3'))
//   },
//   next: menuService.getMenuTags('invest', '3')
// });
menu.state('my_portfolio', {
  run: () => {
      menu.session.set('route', null)
      menu.con(menuService.getMenu('my_portfolio', '3'))
  },
  next: menuService.getMenuTags('my_portfolio', '3')
});

menu.state('my_general_insurance', {
  run: () => {
    menu.session.set('route', 'my_general_insurance')
    menu.con(menuService.getMenu('my_general_insurance', '4'))
  },
  next: menuService.getMenuTags('my_general_insurance', '4')
});
menu.state('products_display', {
  run: () => {

    menu.session.get('route').then(route => {
      console.log("Route is: ", route);

      const selected = menu.val;
      
      console.log("SELECTED ACTION", selected);

      // CHECK IF SUB-ROUTE LEVEL HAS BEEN REACHED
      menu.session.get("route-sub").then(sub => {
        console.log("Sub Route is: ", sub);
        if(sub){

          menu.session.get("route-id").then(routeID => {

            if(sub === 'singular'){
              console.log("HANDLE SINGULAR RESPONSE");
          
              menu.session.get("route-sub-id").then(subid => {
          
                if(selected === "1"){
                  console.log("SEND AN SMS");
                  
                }
                
              })
              
            } else {
              console.log("HANDLE MULTI RESPONSE: ", selected);

              if( selected === "#"){
                menu.session.set('route-sub', null)
                menu.session.set('route-sub-id', null)
                menu.session.set('route-id', null)
                // HANDLE BACK FUNCTION
                menu.go(route)
              } else {
                console.log("DISPLAY DATA SCREEN", routeID);
                
                routeHandler[route][routeID].fetchID(selected).then(res => {
                  console.log("DID IT", res);
                  
                   // SET SUB TO SINGULAR
                    menu.session.set('route-sub', 'singular')
                    menu.session.set('route-sub-id', selected)

                    menu.con(menuService.getMenuFunction(
                      routeHandler[route][routeID].label,
                      res,
                      'products_display',
                      "5"
                    ))
                })
              }

            }


          })

        } else {
          menu.session.set('route-id', selected)
          // FETCH OPERATION
          routeHandler[route][selected].fetch("phone", "name").then(res => {
            
            const len = res.length
            if(len === 0){
              // TODO Display user has no policy
            } else {

              if(len === 1){
                menu.session.set('route-sub', 'singular')
                // ASSUMTION ONLY 1 VALUE SENT
                menu.session.set('route-sub-id', "1")
              } else {
                menu.session.set('route-sub', 'multi')
              }

              menu.con(menuService.getMenuFunction(
                routeHandler[route][selected].label,
                res,
                'products_display',
                "5"
              ))
            }
          })
        }
        
      })
      
    })

  },
  // next: menuService.getMenuTags('products_display_options', '5')
  next: {
    "0": "back_to_main"
  }
});

const routeHandler = {
  "my_general_insurance": {
    "1": {
      product: "Third Party Motor",
      label: "third_party_motor",
      fetch: fetchThirdPartyMotor,
      fetchID: fetchThirdPartyMotorByID
    },
    "2": {
      product: "Comprehensive Motor",
      label: "comprehensive_motor",
      // fetch: fetchComprehensiveMotor,
      // fetchID: fetchComprehensiveMotorID
    },
    "3":{
      product: "Home & Householders Insurance",
      label: "home_householders_insurance",
      fetch: fetchHomeHouseholderInsurance,
      fetchID: fetchHomeHouseholderInsuranceID
    }
  }
}

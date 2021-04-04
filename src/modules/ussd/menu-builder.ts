import UssdMenuBuilder from 'ussd-menu-builder'
import { routeHandler } from './configs/route-handler';
import {menuPicker as menuService} from './menu-picker'
import { fetchComprehensiveMotor, fetchComprehensiveMotorByID, fetchThirdPartyMotor, fetchThirdPartyMotorByID } from './operations/general.Insurance';

export let menu = new UssdMenuBuilder()

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
      menu.session.set('route-id', null)
      menu.session.set('short-circuit', null)
      menu.session.set('res', null)
      menu.con(menuService.getMenu('choose_service', '2'))
    },
    next: menuService.getMenuTags('choose_service', '2')
});

menu.state('entry.pin', {
    run: () => { 
      //TODO: validate pin 
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
    menu.session.set('route', null);
    
    menu.session.get('invalid').then(inval => {
        const menu_text = menuService.getMenu('my_portfolio', '3');
        let invalidInput = "";
        if(inval){
          console.log("______________INVALID INPUT______________");
          invalidInput = "Invalid Input.\n";
        }

        const pre_text = invalidInput + menu_text.variable;
        const stat_text = menu_text.static;
        const full_text = pre_text + menu_text.static;
        // menu.session.set("firstFullText", true);

        if(full_text.length > 100){
          console.log("Too long... ", full_text.length);
          const pre_text_arr = pre_text.split("\n");
          const pre_text_arr_len = pre_text_arr.length;
          console.log("Pre text arr...", pre_text_arr);
          console.log("Pre text len...", pre_text_arr_len);

          const next = "*. Next";
          const prev = "#. Prev";

          let blocks = [""]
          let block_pos = 0;

          pre_text_arr.forEach((el, i) => {
                       
              const block_pos_len = blocks[block_pos].length
              const el_len = el.length + 1;
              let postfix = "";
              let postfix_len;
              if(block_pos === 0){
                postfix = "\n"+ next + stat_text 
                postfix_len = postfix.length //allowance for new line
  
              }else{
                postfix = "\n" + prev + "\n" + next + stat_text 
                postfix_len = postfix.length  //allowance for new line
              }
  
              if((block_pos_len+el_len+postfix_len) < 100){
                blocks[block_pos] = blocks[block_pos] + "\n" + el
                console.log("Push In", blocks[block_pos]);
              } else {
                blocks[block_pos] = blocks[block_pos] + "\n" + el + postfix
                console.log("Move to next", blocks[block_pos]);
                block_pos += 1
                blocks[block_pos] = blocks[block_pos] || "" 
              }

              if( i === pre_text_arr_len-1 ){
                blocks[block_pos] =  blocks[block_pos] + "\n" + prev + stat_text
              } 
            
            // if( i !== pre_text_arr_len-1 ){}
            // else{
            //   console.log("Last Val");
            //   blocks[block_pos] = blocks[block_pos] + prev + stat_text
            // }

          })

          console.log("BLOCKS", blocks);
          


        } else {
          console.log("Good enough... ", full_text.length);
        }


        menu.session.set('invalid', false);
        menu.con(full_text);

    })
  },
  next: {

    '*.+': function(){                
        const selected = menu.val;
        console.log("SELECTED VAL NEXT", selected);

        const nextTags = menuService.getMenuTags('my_portfolio', '3')

        if(nextTags.hasOwnProperty(selected)){
          return nextTags[selected];
        } else{
          menu.session.set('invalid', true);
          return "my_portfolio";
        }
    },
    "0": "back_to_main"
    
  }
});


menu.state('my_general_insurance', {
  run: () => {
    menu.session.set('route', 'my_general_insurance')
    menu.con(menuService.getMenu('my_general_insurance', '4'))
  },
  next: menuService.getMenuTags('my_general_insurance', '4')
});

menu.state('my_life_insurance', {
  run: () => {
    menu.session.set('route', 'my_life_insurance')
    menu.con(menuService.getMenu('my_life_insurance', '4'))
  },
  next: menuService.getMenuTags('my_life_insurance', '4')
});

menu.state('my_savings', {
  run: () => {
    menu.session.set('route', 'my_savings') 
    menu.con(menuService.getMenu('my_savings', '4'))
  },
  next: menuService.getMenuTags('my_savings', '4')
});

menu.state('products_display', {
 run: () => {

  console.log('____________PRODUCT DISPLAY______________');
  
 
  menu.session.get('route').then(route => {
    console.log("Route is: ", route);
    const selected = menu.val;
    menu.session.set('route-id', selected)

    // FETCH OPERATION
    routeHandler[route][selected].fetch("phone", "name").then(res => {
      
      menu.session.set('res', res)
      const len = res.length
      if(len === 0){
        // TODO Display user has no policy
        console.log("user has no policy");
        menu.end("You do not have this policy")
        
      } else {
  
        if(len === 1){
          console.log("go to products_display_one");
          menu.session.set('short-circuit',1)
          .then(menu.go('products_display_one'))
        } else {
          console.log("go to products_display_many");
          menu.go('products_display_many');
        }
  
      }
    })
  });
  
 },
 //next:  {...menuService.getMenuTags('products_display_one', '5'), ...menuService.getMenuTags('products_display_many', '5') } 
 next: {
  '*\\d+':function(){
    return new Promise((resolve, reject) => {
      menu.session.get('res').then( res => {
        const selected:String = menu.val;
        if(res.length === 1){
          console.log("next: go to products_display_one");
          const next = menuService.getMenuTags('products_display_one', '5')
        //  const next = menu.states['products_display_one'].next
          if(next[selected]){resolve(next[selected]);return;}
          
          resolve('products_display_one');
        } else {
          console.log("next: go to products_display_many");
         
         // const next = menu.states['products_display_many'].next
         const next = menuService.getMenuTags('products_display_many', '5')
          if(next[selected]){resolve(next[selected]);return;}
          if(!isNaN(+selected) ){resolve('products_display_one');return;}
          resolve('products_display_many');return;
        }
      });
    });
  },
  '#':function(resolve){
    menu.session.get('route').then( route => {
      resolve(route);
      return;
    })
  }
}
});

menu.state('products_display_one', {
  run: () => {
    console.log('____________PRODUCT DISPLAY ONE______________');

    menu.session.get('route').then(route =>{
    menu.session.get('route-id').then(routeID =>{
      menu.session.get('short-circuit').then(shortCircuit =>{
      const selected = menu.val;
      console.log("selected", selected,shortCircuit);
       menu.session.get('res').then(res =>{
        
        if(shortCircuit){//from short circuit
          console.log("from short circuit - only one item", selected,shortCircuit);
          menu.session.set('short-circuit',false);
          res =res[0];
        
        }else{  //from multi screen
          console.log("from multi screen", selected);
          if(!isNaN(+selected)){
            res =res[parseInt(selected)-1];
          }
          
    
        }
       
        console.log("DID IT", res);
        menu.con(menuService.getMenuFunctionTitle(
           routeHandler[route][routeID].label,
            res,
            'products_display_one',
            "5"
          ))
        });
        });
      });
     
    });
 
},
next: menuService.getMenuTags('products_display_one', '5')
});

menu.state('products_display_many', {
  run: () => {

    console.log('____________PRODUCT DISPLAY MULTI______________');

    menu.session.get('route').then(route =>{
      menu.session.get('route-id').then(routeID =>{
        const selected = menu.val;
        if( selected === "#"){
          menu.session.set('route-id', null)
          // HANDLE BACK FUNCTION
          menu.go(route)
        }
        menu.session.get('res').then(res =>{

          console.log("DID IT", res);
          menu.con(menuService.getMenuFunctionTitle(
          routeHandler[route][routeID].label,
            res,
            'products_display_many',
            "5"
          ))
        });
      });
    });
  },
  next: menuService.getMenuTags('products_display_many', '5')

});

menu.state('sms_product_details', {
  run: () => {
    console.log('____________SMS______________');
    menu.end('SMS Sent')
  },
});

import {productDisplaySchema, productDisplayArraySchema, productNextArraySchema} from './product-schemas'

export function getMenuContent(){
    return {
        "1": {
            "user_exists": {
                "title": "Welcome to Old Mutual Nigeria Emmanuel Rop, please enter your secret 4 digit PIN code.",
                "next": {
                    "*\\d+": "entry.pin",
                }
            }
        },
        "2": {
            "choose_service": {
                "title": "1. Insure with us\n2. Invest with us\n3. View My Portfolio",
                "next": {
                    "1": "insure",
                    "2": "invest",
                    "3": "my_portfolio"
                }
            }
        },
        "3": {
            "my_portfolio": {
                "title": "1. View My General Insurance Products\n2. View My Life Insurance Products\n3. View My Savings Products\n0. Main Menu",
                "next": {
                    "1": "my_general_insurance",
                    "2": "my_life_insurance",
                    "3": "my_savings",
                    "0": "back_to_main"
                }
            }
        },
        "4": {
            "my_general_insurance": {
                "title": "1. Third Party Motor\n2. Comprehensive Motor\n3. Home & Householders Insurance\n4. Fire & Special Perils Insurance\n5. Burglary & Housebreaking Insurance\n6. Hersurance\n7. TravelSure\n\n0. Main Menu\n#. Previous Menu",
                "next": {
                    "1": "products_display",
                    "2": "products_display",
                    "3": "products_display",
                    "4": "products_display",
                    "5": "products_display",
                    "6": "products_display",
                    "7": "products_display",
                    "0": "back_to_main",
                    "#": "my_portfolio"
                }
            },
            "my_life_insurance": {
                "title": "1. Family Plan\n2. TermLife Cover\n3. Critical Illness\nPlan\n4. Personal Accident\n\n0. Main Menu\n#. Previous Menu",
                "next": {
                    "1": "products_display",
                    "2": "products_display",
                    "3": "products_display",
                    "4": "products_display",
                    "0": "back_to_main",
                    "#": "my_portfolio"
                }
            },
            "my_savings": {
                "title": "1. 2in1 Savings Plan\n\n0. Main Menu\n#. Previous Menu",
                "next": {
                    "1": "products_display",
                    "0": "back_to_main",
                    "#": "my_portfolio"
                }
            }
        },
        "5": {
           
            "products_display_many":{
                    "title": (name, data) => {
                            const display = productDisplayArraySchema[name](data)
                            return `${display}\n\n 0. Main Menu\n #. Previous Menu`
                        }
                        ,"next":{
                           // "#": "sms_product_details",
                            "0": "back_to_main",
                            "1": "products_display_one",
                            "*\\d+": "products_display_one",
                        }
                },
                "products_display_one":{
                    "title": (name, data) => {
                            const display = productDisplaySchema[name](data)
                            return `${display}\n\n 1. SMS me the details\n 0. Main Menu`
                        }
                     ,"next":{
                            "1": "sms_product_details",
                            "0": "back_to_main",
                        }
                },
            
        }
        
    }
}
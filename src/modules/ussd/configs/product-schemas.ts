import {ThirdPartyMotorAttributes} from '../interfaces'

export const productDisplaySchema ={
    "third_party_motor": (data: ThirdPartyMotorAttributes) => {
        return `Third Party Motor\n Policy Number ${data.policy_number}\n Car Registration ${data.vehicle_registration_number}\n Make & Model ${data.vehicle_make} ${data.vehicle_model}\n Premium Amount ${data.premium_amount}\n Vehicle Value ${data.vehicle_value}\n Expiry Date ${data.expiry_date}`
    },
    "comprehensive_motor": (data: ThirdPartyMotorAttributes) => {
        return `Comprehensive Motor\n Policy Number ${data.policy_number}\n Car Registration ${data.vehicle_registration_number}\n Make & Model ${data.vehicle_make} ${data.vehicle_model}\n Premium Amount ${data.premium_amount}\n Vehicle Value ${data.vehicle_value}\n Expiry Date ${data.expiry_date}`
    }
}
export const productDisplayArraySchema ={
    "third_party_motor": (data: Array<ThirdPartyMotorAttributes>) => {
        
        const result = data.map((el, i)=>{
            return `${el.id} ${el.vehicle_registration_number}`
        })

        return `Third Party Motor(Registered Vehicles)\n ${result.join("\n")}`
    },
    "comprehensive_motor": (data: Array<ThirdPartyMotorAttributes>) => {
        
        const result = data.map((el, i)=>{
            return `${el.id} ${el.vehicle_registration_number}`
        })

        return `Comprehensive Motor(Registered Vehicles)\n ${result.join("\n")}`
    }
}
export const productNextArraySchema ={
    "products_display_one": (data: Array<ThirdPartyMotorAttributes>) => {
        
       const result = new Map(data.map(obj => [obj.id, 'products_display_one']));

        return result
    }
}
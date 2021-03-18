import {FamilyPlanAttributes, HomeHouseholderAttributes, ThirdPartyMotorAttributes} from '../interfaces'

export const productDisplaySchema ={
    "third_party_motor": (data: ThirdPartyMotorAttributes) => {
        return `Third Party Motor\n Policy Number: ${data.policy_number}\n Car Registration: ${data.vehicle_registration_number}\n Make & Model: ${data.vehicle_make} ${data.vehicle_model}\n Premium Amount: ${data.premium_amount}\n Vehicle Value: ${data.vehicle_value}\n Expiry Date: ${data.expiry_date}`
    },
    "home_householders_insurance":(data: HomeHouseholderAttributes) => {
        return `Home & Householder Insurance \n Policy Number: ${data.policy_number}\n Policy Status: ${data.policy_status}\n Address Covered: ${data.address_covered}\n Cover Start Date: ${data.cover_start_date}\n Cover End Date: ${data.cover_end_date}\n Premium Amount: ${data.premium}`
    },
    "family_plan": (data: FamilyPlanAttributes) =>{
        return `Family Plan\n Policy Number: ${data.policy_number}\n Cover Amount: ${data.cover_amount}\n Policy Sattus: ${data.policy_status}\n Premium Amount: ${data.premium_amount}\n Premium Frequency: ${data.premium_frequency}`
    }
}
export const productDisplayArraySchema ={
    "third_party_motor": (data: Array<ThirdPartyMotorAttributes>) => {
        
        const result = data.map((el, i)=>{
            return `${el.id} ${el.vehicle_registration_number}`
        })

        return `Third Party Motor(Registered Vehicles)\n ${result.join("\n")}`
    },
    "home_householders_insurance":(data: Array<HomeHouseholderAttributes>) => {
        const result = data.map((el, i)=>{
            return `${el.id} ${el.policy_number}`
        })

        return `Home & Householder Insurance\n ${result.join("\n")}`
    },

    "family_plan":(data: Array<FamilyPlanAttributes>) => {
        const result = data.map((el, i)=>{
            return `${el.id} ${el.policy_number}`
        })

        return `Family Plan\n ${result.join("\n")}`
    }
}
const third_party_motor = [
    {
        id: "1",
        policy_number: "******345",
        premium_amount: "₦5,000",
        vehicle_make: "Mercedes",
        vehicle_model: "C220",
        vehicle_registration_number: "AEG3999",
        vehicle_value: "₦7,000,000",
        policy_status: "Active",
        expiry_date: "24/10/2021",
    },
    {
        id: "2",
        policy_number: "******653",
        premium_amount: "₦5,000",
        vehicle_make: "Toyota",
        vehicle_model: "hilux",
        vehicle_registration_number: "AEG35262",
        vehicle_value: "₦3,000,000",
        policy_status: "Active",
        expiry_date: "06/10/2021",
    }
]
export async function fetchThirdPartyMotor(phone, name){
    // TODO FETCH DATA
    
    // TODO CACHE DATA
    
    return Promise.resolve(third_party_motor)
}

export async function fetchThirdPartyMotorByID(id){
    // TODO FETCH FROM CACHED
   const product = third_party_motor.find((el) => el.id === id)
   
   return Promise.resolve([product])
}

const home_householder_insurance = [{
    "id": "1",
    "policy_number": "******235",
    "address_covered": "18 Olowu Street,Ikeya,Lagos",
    "cover_start_date": "24/03/2021",
    "cover_end_date": "24/10/2021",
    "policy_status": "Active",
    "premium": "₦5,000",
    "sum_insured": "₦20,0000"
}
// {
//     "id": "2",
//     "policy_number": "******257",
//     "address_covered": "49 Olowu Street,Ikeya,Lagos",
//     "cover_start_date": "15/01/2021",
//     "cover_end_date": "31/12/2021",
//     "policy_status": "Active",
//     "premium": "₦5,000",
//     "sum_insured": "₦20,0000"
// }
]

export async function fetchHomeHouseholderInsurance(phone, name){
    // TODO FETCH DATA
    
    // TODO CACHE DATA
    
    return Promise.resolve(home_householder_insurance)
}

export async function fetchHomeHouseholderInsuranceID(id){
    // TODO FETCH FROM CACHED
   const product = home_householder_insurance.find((el) => el.id === id)
   
   return Promise.resolve([product])
}
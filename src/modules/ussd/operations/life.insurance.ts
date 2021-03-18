const family_plan = [{
    "id": "1",
    "policy_number": "******235",
    "cover_amount": "₦3,0000",
    "premium_amount": "₦20,0000",
    "premium_frequency": "Monthly",
    "policy_status": "Active"
}
// {
//     "id": "2",
//     "policy_number": "******235",
//     "cover_amount": "₦3,0000",
//     "premium_amount": "₦20,0000",
//     "premium_frequency": "Monthly",
//     "policy_status": "Active"
// }
]

export async function fetchFamilyPlan(phone, name){
    // TODO FETCH DATA
    
    // TODO CACHE DATA
    
    return Promise.resolve(family_plan)
}

export async function fetchFamilyPlanID(id){
    // TODO FETCH FROM CACHED
   const product = family_plan.find((el) => el.id === id)
   
   return Promise.resolve([product])
}
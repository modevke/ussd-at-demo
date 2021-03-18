export interface ThirdPartyMotorAttributes{
    id: string,
    policy_number: string,
    premium_amount: string,
    vehicle_make: string,
    vehicle_model: string,
    vehicle_registration_number: string,
    vehicle_value: string,
    policy_status: string,
    expiry_date: string,
}

export interface HomeHouseholderAttributes{
    id: string,
    policy_number: string,
    address_covered: string,
    cover_start_date: string,
    cover_end_date: string,
    policy_status: string,
    premium: string,
    sum_insured: string
}

export interface FamilyPlanAttributes{
    id: string,
    policy_number: string,
    cover_amount: string,
    premium_amount: string,
    premium_frequency: string,
    policy_status: string
}
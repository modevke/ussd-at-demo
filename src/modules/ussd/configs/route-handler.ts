import { fetchComprehensiveMotor, fetchComprehensiveMotorByID, fetchThirdPartyMotor, fetchThirdPartyMotorByID } from "../operations/general.Insurance";

export const routeHandler = {
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
        fetch: fetchComprehensiveMotor,
        fetchID: fetchComprehensiveMotorByID
      }
    }
  }
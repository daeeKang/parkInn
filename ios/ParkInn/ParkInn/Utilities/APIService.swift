//
//  APIService.swift
//  ParkInn
//
//  Created by Kyle Aquino on 4/8/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import Foundation
import Alamofire

class APIService {
    typealias LotsCompletion = (Result<[Lot], AFError>) -> ()
    static func getLots(companyID: String, completion: @escaping LotsCompletion) {
        AF.request(APIRouter.companyLots(companyID: companyID)).responseDecodable { (response: DataResponse<[Lot], AFError>) in
            completion(response.result)
        }
    }
}

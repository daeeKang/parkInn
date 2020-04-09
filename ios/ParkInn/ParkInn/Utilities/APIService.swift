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

    @discardableResult
    private static func performRequest<T:Decodable>(route:APIRouter, decoder: JSONDecoder = JSONDecoder(), completion:@escaping (Result<T, AFError>)->Void) -> DataRequest {
        return AF.request(route)
                        .responseDecodable (decoder: decoder){ (response: DataResponse<T, AFError>) in
                            completion(response.result)
        }
    }

    static func getLots(companyID: String, completion: @escaping LotsCompletion) {
        performRequest(route: APIRouter.companyLots(companyID: companyID), completion: completion)
    }
}

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
    typealias LotDesignCompletion = (Result<[LotDesign], AFError>) -> ()
    typealias LotStatsCompletion = (Result<LotStats, AFError>) -> ()
    typealias CompanyStatsCompletion = (Result<CompanyStats, AFError>) -> ()

    @discardableResult
    private static func performRequest<T:Decodable>(route:APIRouter, decoder: JSONDecoder = JSONDecoder(), completion:@escaping (Result<T, AFError>)->Void) -> DataRequest {
        return AF.request(route)
                        .responseDecodable (decoder: decoder){ (response: DataResponse<T, AFError>) in
                            completion(response.result)
        }
    }

    static func getLots(companyID: String, completion: @escaping LotsCompletion) {
        performRequest(route: .companyLots(companyID: companyID), completion: completion)
    }

    static func getLots(latitude: Double, longitude: Double, radius: Int, completion: @escaping LotsCompletion) {
        performRequest(route: .lots(latitude: latitude, longitude: longitude, radius: radius), completion: completion)
    }

    static func getLotDesign(companyID: String, lotID: String, completion: @escaping LotDesignCompletion) {
        performRequest(route: .lotDesign(companyID: companyID, lotID: lotID), completion: completion)
    }

    static func getLotStats(companyName: String, lotID: String, completion: @escaping LotStatsCompletion) {
        performRequest(route: .lotStats(companyName: companyName, lotID: lotID), completion: completion)
    }

    static func getCompanyStats(companyName: String, completion: @escaping CompanyStatsCompletion) {
        performRequest(route: .companyStats(companyName: companyName), completion: completion)
    }
}

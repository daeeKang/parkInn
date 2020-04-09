//
//  APIRouter.swift
//  ParkInn
//
//  Created by Kyle Aquino on 4/8/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import Foundation
import Alamofire

enum APIRouter: URLRequestConvertible {

    case lot(companyID: Int, lotID: String)
    case companyLots(companyID: String)
    case lots(latitude: Double, longitude: Double, radius: Int)
    case lotDesign(companyID: String, lotID: String)
    case peakTimes(companyID: String, lotID: String)

    // MARK: - HTTPMethod
    private var method: HTTPMethod {
        switch self {
            case .lot, .lots, .companyLots, .lotDesign, .peakTimes:
                return .get
        }
    }

    // MARK: - Path
    private var path: String {
        switch self {
            case .lot(let companyID, let lotID):
                return "/Lots/GetLot/\(companyID)/\(lotID)/"
            case .lots(let latitude, let longitude, let radius):
                return "/Lots/GetLotsWithinArea/\(latitude)/\(longitude)/\(radius)/"
            case .companyLots(let companyID):
                return "/Lot/GetLots/\(companyID)/"
            case .lotDesign(let companyID, let lotID):
                return "/Lot/GetLotDesign?companyid=\(companyID)&lotid=\(lotID)"
            case .peakTimes(let companyID, let lotID):
                return "/Lot/GetPeakTimes/\(companyID)/\(lotID)"
        }
    }

    // MARK: - Parameters
    private var parameters: Parameters? {
        //        switch self {
        //            case .lot: break
        //            case .lots(latitude: let latitude, longitude: let longitude, radius: let radius):
        //            break
        //        }
        return nil
    }

    // MARK: - URLRequestConvertible
    func asURLRequest() throws -> URLRequest {
        let url = try ProductionServer.baseURL.asURL()

        var urlRequest = URLRequest(url: url.appendingPathComponent(path))

        // HTTP Method
        urlRequest.httpMethod = method.rawValue

        // Common Headers
        urlRequest.setValue(ContentType.json.rawValue, forHTTPHeaderField: HTTPHeaderField.acceptType.rawValue)
        urlRequest.setValue(ContentType.json.rawValue, forHTTPHeaderField: HTTPHeaderField.contentType.rawValue)

        // Parameters
        if let parameters = parameters {
            do {
                urlRequest.httpBody = try JSONSerialization.data(withJSONObject: parameters, options: [])
            } catch {
                throw AFError.parameterEncodingFailed(reason: .jsonEncodingFailed(error: error))
            }
        }

        return urlRequest
    }
}

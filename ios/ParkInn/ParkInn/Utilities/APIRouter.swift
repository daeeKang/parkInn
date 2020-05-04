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
    case companyStats(companyName: String)
    case customerProfile(email: String)
    case lotStats(companyName: String, lotID: String)
    case lotsNamed(name: String)
    case addReservation(reservation: Reservation)
    case reservations(email: String)

    // MARK: - HTTPMethod
    private var method: HTTPMethod {
        switch self {
            case .lot, .lots, .companyLots, .lotsNamed, .lotDesign,
                 .peakTimes, .companyStats, .lotStats, .customerProfile, .reservations:
                return .get
            case .addReservation:
                return .post
        }
    }

    // MARK: - Path
    private var path: String {
        switch self {
            case .lot(let companyID, let lotID):
                return "/Lot/GetLot/\(companyID)/\(lotID)/"
            case .lots(let latitude, let longitude, let radius):
                return "/Lot/GetLotsWithinArea/\(latitude)/\(longitude)/\(radius)/"
            case .companyLots(let companyID):
                return "/Lot/GetLots/\(companyID)/"
            case .lotsNamed(let name):
                return "/Lot/SearchForLot/\(name)"
            case .lotDesign(let companyID, let lotID):
                return "/Lot/GetLotDesign/\(companyID)/\(lotID)"
            case .peakTimes(let companyID, let lotID):
                return "/Lot/GetPeakTimes/\(companyID)/\(lotID)"
            case .companyStats(let companyName):
                return "/Statistic/\(companyName)/"
            case .lotStats(let companyName, let lotID):
                return "/Statistic/\(companyName)/\(lotID)"
            case .addReservation:
                return "/Reservation/AddReservation"
            case .reservations(let email):
                return "Reservation/GetReservations/\(email)"
            case .customerProfile(let email):
                return "/Customer/GetCustomer/\(email)"
        }
    }

    // MARK: - Parameters
    private var parameters: Data? {
        switch self {
            case .addReservation(let reservation):
                let encoder = JSONEncoder()
                encoder.outputFormatting = .prettyPrinted

                let json = try! encoder.encode(reservation)
                print(String(data: json, encoding: .utf8))


                return json
            default:
                return nil
        }
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

        // Add JWT auth
        if SessionManager.shared.profile != nil {
            if let jwt = SessionManager.shared.keychain.string(forKey: "access_token") {
                urlRequest.setValue("Bearer \(jwt)", forHTTPHeaderField: "Authorization")
            }
        }


        // Parameters
        if let parameters = parameters {
            urlRequest.httpBody = parameters
        }

        print(urlRequest.url)
        return urlRequest
    }
}

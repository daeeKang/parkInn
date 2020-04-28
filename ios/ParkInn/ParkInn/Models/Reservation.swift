//
//  Reservation.swift
//  ParkInn
//
//  Created by Kyle Aquino on 4/24/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import Foundation

struct Reservation: Codable {
    let companyID: String
    let lotID: String
    let spotID: String
    // Dates need to be ISO 8601
    let startTime: String
    let endTime: String
    let username: String
    let expired: Bool

    enum CodingKeys: String, CodingKey {
        case companyID = "companyid"
        case lotID = "lotid"
        case spotID = "spotid"
        case startTime = "starttime"
        case endTime = "endtime"
        case username
        case expired
    }
}

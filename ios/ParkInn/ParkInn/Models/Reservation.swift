//
//  Reservation.swift
//  ParkInn
//
//  Created by Kyle Aquino on 4/24/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import Foundation

struct Reservation: Codable, Hashable {
    let _id: String
    let companyID: String
    let lotID: String
    let lotName: String?
    let spotID: String
    // Dates need to be ISO 8601
    let startTime: String
    let endTime: String
    let username: String
    let expired: Bool

    enum CodingKeys: String, CodingKey {
        case companyID = "companyid"
        case lotID = "lotid"
        case lotName = "lotname"
        case spotID = "spotid"
        case startTime = "starttime"
        case endTime = "endtime"
        case username
        case expired
        case _id
    }

    init(companyID: String, lotName: String, lotID: String, spotID: String, startTime: String, endTime: String, username: String, expired: Bool, id: String = "") {
        self.companyID = companyID
        self.lotID = lotID
        self.lotName = lotName
        self.spotID = spotID
        self.startTime = startTime
        self.endTime = endTime
        self.username = username
        self.expired = expired
        self._id = id
    }

}

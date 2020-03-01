//
//  Lot.swift
//  ParkInn
//
//  Created by Kyle Aquino on 3/1/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import Foundation

class Lot: Decodable {
    let companyID: String
    let lotID: Int
    let spots: [Spot]
    let totalSpots: Int
    let availableSpots: Int
    let peakTimes: [PeakTime]
    let location: Coordinate

    enum CodingKeys: String, CodingKey {
        case companyID = "companyid"
        case lotID = "lotid"
        case spots
        case totalSpots
        case availableSpots
        case peakTimes
        case location
    }
}

// MARK: - Additional Structs for Decoding Lot

struct Spot: Decodable {
    let spotid: String
    let active: Bool
    let unavailable: Date?
    let category: String
}

struct PeakTime: Decodable {
    let hour: Int
    let count: Int
}

struct Coordinate: Decodable {
    var latitude: Double
    var longitude: Double
}

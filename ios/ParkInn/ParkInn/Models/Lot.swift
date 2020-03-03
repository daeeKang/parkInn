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
    let lotName: String?
    let spots: [Spot]
    let totalSpots: Int
    let availableSpots: Int
    let peakTimes: [PeakTime]
    let location: Coordinate
    let imageDetails: Image


    enum CodingKeys: String, CodingKey {
        case companyID = "companyid"
        case lotID = "lotid"
        case lotName
        case spots
        case totalSpots
        case availableSpots
        case peakTimes
        case location
        case imageDetails = "img"
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


struct Image: Decodable {
    var data: ImageData
    var contentType: String
    var image: UIImage? {
        return UIImage(data: data.data)
    }
}

struct ImageData: Decodable {
    var bytes: [UInt8]

    enum CodingKeys: String, CodingKey {
        case bytes = "data"
    }

    var data: Data {
        return Data(bytes: bytes, count: bytes.count)
    }
}

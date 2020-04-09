//
//  CompanyStats.swift
//  ParkInn
//
//  Created by Kyle Aquino on 4/9/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import Foundation

struct CompanyStats: Decodable {
    let lotStats: [LotStats]
    let availableSpots: Int
    let totalSpots: Int
    let peakTimes: [PeakTime]
    let averageTimeParked: TimeParked
    let revenue: Int // In pennies

    enum CodingKeys: String, CodingKey {
        case lotStats = "lotStatistics"
        case companyStatistics = "companyStatistics"
    }

    enum CompanyCodingKeys: String, CodingKey {
        case availableSpots, totalSpots, peakTimes, averageTimeParked, revenue
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        lotStats = try container.decode([LotStats].self, forKey: .lotStats)
        let companyStats = try container.nestedContainer(keyedBy: CompanyCodingKeys.self, forKey: .companyStatistics)
        availableSpots = try companyStats.decode(Int.self, forKey: .availableSpots)
        totalSpots = try companyStats.decode(Int.self, forKey: .totalSpots)
        peakTimes = try companyStats.decode([PeakTime].self, forKey: .peakTimes)
        averageTimeParked = try companyStats.decode(TimeParked.self, forKey: .averageTimeParked)
        revenue = try companyStats.decode(Int.self, forKey: .revenue)
    }

}

struct LotStats: Decodable {
    let lotID: Int
    let availableSpots: Int
    let totalSpots: Int
    let peakTimes: AggregatePeakTimes
    let averageTimeParked: TimeParked
    let revenue: Int // In pennies

    enum CodingKeys: String, CodingKey {
        case lotID = "lotid"
        case availableSpots
        case totalSpots
        case peakTimes
        case averageTimeParked
        case revenue
    }
}

struct AggregatePeakTimes: Decodable {
    let times: [PeakTime]
    let date: String // Peak Times are from the day before
}

struct TimeParked: Decodable {
    let currentAverage: Double // In minutes
    let totalCount: Int
}

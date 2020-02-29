//
//  ManagementVC.swift
//  ParkInn
//
//  Created by Kyle Aquino on 2/13/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit

//classe to manage cell structure
class ManagementVC: UIViewController, UICollectionViewDataSource, UICollectionViewDelegate {

     //test data for
     let lotNumber = ["Lot 1", "Lot 2", "Lot 3", "Lot 4", "Lot 5", "Lot 6", "Lot 7", "Lot 8", "Lot 9"]
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
           return lotNumber.count
    }
    
    //iterates the cells applying any modifications
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "manageCell", for: indexPath) as! ManagementCVCell
        
        cell.testLabel.text = lotNumber[indexPath.item]
        
        return cell
        
    }

}

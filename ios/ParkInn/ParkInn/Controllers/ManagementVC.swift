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

    @IBOutlet private weak var collectionView: UICollectionView!
    
     //test data
     let lotNumber = ["Lot 1", "Lot 2", "Lot 3", "Lot 4", "Lot 5", "Lot 6", "Lot 7", "Lot 8", "Lot 9"]
    
    override func viewDidLoad() {
        super.viewDidLoad()

        //set up the amount of columns
        let width = (view.frame.size.width - 20) / 2
        //variable layout to access properties of collectionView
        let layout = collectionView.collectionViewLayout as! UICollectionViewFlowLayout
        //size of each cell
        layout.itemSize = CGSize(width: width, height: width)
        //space for all corners of the cell
        layout.sectionInset = UIEdgeInsets(top: 5, left: 5, bottom: 5, right: 5)
        
    }
    
    //get number of items in the array
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
           return lotNumber.count
    }
    
    //iterates the cells applying any modifications
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "manageCell", for: indexPath) as! ManagementCVCell
        
        //center text in the center
        cell.testLabel.textAlignment = NSTextAlignment.center
   
        //change label text for testing
        cell.testLabel.text = lotNumber[indexPath.item]
        //round out border 
        cell.contentView.layer.cornerRadius = 40
        cell.contentView.layer.borderWidth = 2
       

        return cell
        
    }

}

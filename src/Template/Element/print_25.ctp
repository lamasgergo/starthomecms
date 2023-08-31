<?php 

    $delimiter = ";"; 
    $filename = "selected_properties_" . date('Y-m-d') . ".csv"; 
     
    // Create a file pointer 
    $f = fopen('php://memory', 'w'); 
     
    // Set column headers 
    $fields = array('ID', 'CONTACT NAME', 'PHONE', 'EMAIL', 'ADDRESS','RENT PRICE', 'SALE PRICE', 'CREATED', 'STATUS'); 
    fputcsv($f, $fields, $delimiter); 
     
    // Output each row of the data, format line as csv and write to file pointer 
    foreach ($datas as $k=>$property) {
	$id=$property->properties_variation->id;
	$name='';
	$phone='';
	$email='';
        foreach($property->contacts as $onecontact) {
            if($onecontact->_joinData['main']==1 and $onecontact->_joinData['type']==1) {
		$name=$onecontact->fullname;
		$phone=$onecontact->phone1_formatted.(!empty($onecontact->phone1note)?' ('.$onecontact->phone1note.')':null);
		$email=$onecontact->email1;
	    }
            if($onecontact->_joinData['main']==1 and $onecontact->_joinData['type']==2) {
		$name=$onecontact->fullname;
		$phone=$onecontact->phone1_formatted.(!empty($onecontact->phone1note)?' ('.$onecontact->phone1note.')':null);
		$email=$onecontact->email1;
	    }

	} 	
	$price_rent='';
	$price_sale='';
	if($property->properties_variation->type == 1){
	    $price_rent=$property->properties_variation->price_eur_formatted_en;
	}else{
	    $price_sale=$property->properties_variation->price_eur_formatted_en;
	}


        $address = $property->address;    
        $lineData = array($id, iconv("UTF-8", "ISO-8859-1", $name), iconv("UTF-8", "ISO-8859-1", $phone), $email, iconv("UTF-8", "ISO-8859-1", $address),$price_rent, $price_sale, '', ''); 
        fputcsv($f, $lineData, $delimiter); 
    } 
    // Move back to beginning of file 
    fseek($f, 0); 
    // Set headers to download file rather than displayed 
    header('Content-Type: text/csv'); 
    header('Content-Disposition: attachment; filename="' . $filename . '";'); 
    //output all remaining data on a file pointer 
    fpassthru($f); 
?>
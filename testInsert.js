const payload = {
    "id": "list1",
    "title": "Coll-cd Sachet 12.5gm, Powder",
    "searchableRawText": "coll-cd sachet 12.5gm, powder\n\n9 mins ago\n\nmeerut, uttar pradesh\n\ncollagen peptides\nquantity\t: 30 box\npack size\t: pack of 30 sachet\ni want this for\t: hospital use\nprobable order value\t:\nrs. 20,000 to 50,000\nview similar\nshortlist\nhide\nnot relevant\n\nbuyer details\n- member since 8+ years -\n\nbuys\n\n:  \nraw mango,philips vacuum cleaners,v-guard solar power plants\n\nengagement\n\n:  \nrequirements: 29|calls: 19|replies: 8\n\navailable\n\n:\nbuyer also viewed: \n\ncoll-cd sachet 12.5gm, powder\n₹ 78 / piece\ncontact buyer now",
    "contact": {
        "mobileAvailable": true,
        "emailAvailable": true,
        "whatsappAvailable": true,
        "nameAvailable": true,
        "businessNameAvailable": true
    },
    "contactText": "Mobile Number AvailableEmail ID AvailableCompany Name AvailableWhatsApp Available"
};

async function testInsert() {
    try {
        console.log('Sending data to POST /data...');
        const response = await fetch('http://localhost:3001/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const text = await response.text();
        console.log('--- Response Status ---');
        console.log(response.status);
        console.log('--- Response Data ---');
        console.log(text);
    } catch (error) {
        console.error('Error inserting data:', error);
    }
}

testInsert();

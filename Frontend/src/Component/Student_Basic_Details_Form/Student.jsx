import  { useState } from "react";

const Student = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    address: "",
    village: "",
    district: "",
    state: "",
    pin: "",
    about: ""
  });
  const indianStates = [
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", 
    "Assam", "Bihar", "Chandigarh", "Chhattisgarh", 
    "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", 
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", 
    "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", 
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
];
const stateDistrictData = {
  "Andaman and Nicobar Islands": ["Nicobar", "North and Middle Andaman", "South Andaman"],
  "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Kadapa", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari"],
  "Arunachal Pradesh": ["Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kamle", "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit", "Longding", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai", "Pakke-Kessang", "Papum Pare", "Shi Yomi", "Siang", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"],
  "Assam": ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"],
  "Bihar": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
  "Chhattisgarh": ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"],
  "Delhi": ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"],
  "Goa": ["North Goa", "South Goa"],
  "Gujarat": ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhumi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"],
  "Maharashtra": ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
  "West Bengal": ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"]
};

  
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // form submission logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-25">
      <div className="shadow-xl rounded-lg p-6 md:p-10 max-w-3xl w-full">
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Student Registration Form</h1>
          <p className="text-gray-600">Please fill out all the required information</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Section */}
          <div>
            <h2 className="text-lg font-medium text-gray-700 mb-3 border-b pb-2">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                <input 
                  type="text" 
                  id="firstName"
                  name="firstName" 
                  placeholder="Enter first name" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="middleName" className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                <input 
                  type="text" 
                  id="middleName"
                  name="middleName" 
                  placeholder="Enter middle name" 
                  value={formData.middleName} 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" 
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                <input 
                  type="text" 
                  id="lastName"
                  name="lastName" 
                  placeholder="Enter last name" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" 
                  required 
                />
              </div>
            </div>
          </div>

          {/* Family Information Section */}
          <div>
            <h2 className="text-lg font-medium text-gray-700 mb-3 border-b pb-2">Family Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700 mb-1">Father's Name*</label>
                <input 
                  type="text" 
                  id="fatherName"
                  name="fatherName" 
                  placeholder="Enter father's name" 
                  value={formData.fatherName} 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="motherName" className="block text-sm font-medium text-gray-700 mb-1">Mother's Name*</label>
                <input 
                  type="text" 
                  id="motherName"
                  name="motherName" 
                  placeholder="Enter mother's name" 
                  value={formData.motherName} 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" 
                  required 
                />
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div>
            <h2 className="text-lg font-medium text-gray-700 mb-3 border-b pb-2">Address Details</h2>
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Complete Address*</label>
              <textarea 
                id="address"
                name="address" 
                placeholder="Enter your full address" 
                value={formData.address} 
                onChange={handleChange} 
                rows="3"
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" 
                required
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">State*</label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          >
            <option value="disabled">Select a State</option>
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* District Dropdown */}
        <div>
          <label htmlFor="district" className="block text-sm font-medium text-gray-700">District*</label>
          <select
            id="district"
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
            disabled={!formData.state}
          >
            <option value="">Select a District</option>
            {formData.state &&
              stateDistrictData[formData.state]?.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
          </select>
        </div>
              
             
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           
            <div>
                <label htmlFor="village" className="block text-sm font-medium text-gray-700 mb-1">Village/Town*</label>
                <input 
                  type="text" 
                  id="village"
                  name="village" 
                  placeholder="Enter village or town" 
                  value={formData.village} 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-1">PIN Code*</label>
                <input 
                  type="text" 
                  id="pin"
                  name="pin" 
                  placeholder="Enter PIN code" 
                  value={formData.pin} 
                  onChange={handleChange} 
                  pattern="[0-9]{6}" 
                  title="PIN code must be 6 digits"
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" 
                  required 
                />
              </div>
            </div>
          </div>

          {/* About Section */}
          <div>
            <h2 className="text-lg font-medium text-gray-700 mb-3 border-b pb-2">Additional Information</h2>
            <div>
              <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-1">About Yourself*</label>
              <textarea 
                id="about"
                name="about" 
                placeholder="Tell us about your educational background, interests, and goals" 
                value={formData.about} 
                onChange={handleChange} 
                rows="4"
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" 
                required
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out font-medium"
            >
              Submit Registration
            </button>
            <p className="text-xs text-gray-500 text-center mt-2">All fields marked with * are required</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Student;
<template>
  <ElTabs v-model="activeTab" type="card">
    <!-- Tab 1: Account Details -->
    <ElTabPane label="Account Details" name="account-details">
      <VRow>
        <VCol cols="12">
          <VCard title="Account Details">
            <VCardText class="d-flex">
              <!-- Avatar -->
              <VAvatar rounded="lg" size="100" class="me-6" :image="state.previewImg" />

              <!-- Upload Photo -->
              <form class="d-flex flex-column justify-center gap-5">
                <div class="d-flex flex-wrap gap-2">
                  <VBtn color="primary" @click="refInputEl?.click()">
                    <VIcon icon="bx-cloud-upload" class="d-sm-none" />
                    <span class="d-none d-sm-block">Upload new photo</span>
                  </VBtn>

                  <input ref="refInputEl" type="file" name="file" accept=".jpeg,.png,.jpg,GIF" hidden
                    @input="changeAvatar" />

                  <VBtn type="reset" color="error" variant="tonal" @click="resetAvatar">
                    <span class="d-none d-sm-block">Reset</span>
                    <VIcon icon="bx-refresh" class="d-sm-none" />
                  </VBtn>
                </div>

                <p class="text-body-1 mb-0">Allowed JPG, GIF, or PNG. Max size of 800K</p>
              </form>
            </VCardText>

            <VDivider />

            <VCardText>
              <!-- Account Form -->
              <VForm class="mt-6">
                <VRow>
                  <!-- Name -->
                  <VCol md="6" cols="12">
                    <VTextField v-model="personalDetails.name" placeholder="John" label="Name" />
                  </VCol>

                  <!-- Phone Number -->
                  <VCol md="6" cols="12">
                    <VTextField v-model="basicInfo.phone" placeholder="Phone Number" label="Phone Number" />
                  </VCol>

                  <!-- Email -->
                  <VCol cols="12" md="6">
                    <VTextField v-model="basicInfo.email" label="E-mail" placeholder="johndoe@gmail.com" type="email" />
                  </VCol>

                  <!-- Organization -->
                  <VCol cols="12" md="6">
                    <VTextField v-model="basicInfo.password" label="New Password" placeholder="New Password" />
                  </VCol>

                  <!-- Role Type -->
                  <VCol cols="12" md="6">
                    <VSelect v-model="personalDetails.role" label="Role Type" :items="['bride', 'groom']"
                      placeholder="Select Role" />
                  </VCol>

                  <!-- Phone -->
                  <VCol cols="12" md="6">
                    <VTextField v-model="personalDetails.age" type="number" label="Age" placeholder="Enter the age" />
                  </VCol>

                  <!-- Height -->
                  <VCol cols="12" md="6">
                    <VSelect v-model="personalDetails.height" label="Height" placeholder="Select Height"
                      :items="state.selector.height" />
                  </VCol>

                  <!-- Skin Colour -->
                  <VCol cols="12" md="6">
                    <VSelect v-model="personalDetails.skin_colour" label="Skin Colour" placeholder="Select Skin Colour"
                      :items="state.selector.skin_colour" />
                  </VCol>

                  <!-- Figure -->
                  <VCol cols="12" md="6">
                    <VSelect v-model="personalDetails.figure" label="Figure" placeholder="Select Figure"
                      :items="state.selector.figure" />
                  </VCol>

                  <!-- Citizen -->
                  <VCol cols="12" md="6">
                    <VSelect v-model="personalDetails.citizenship" label="Citizen" placeholder="Select Citizen"
                      :items="state.selector.citizenOptions" />
                  </VCol>

                  <!-- Educational Qualification -->
                  <VCol cols="12" md="6">
                    <VSelect v-model="personalDetails.education" label="Educational Qualification"
                      placeholder="Select Educational Qualification" :items="state.selector.education_qualification" />
                  </VCol>

                  <!-- Profession -->
                  <VCol cols="12" md="6">
                    <VSelect v-model="personalDetails.profession" label="Profession" placeholder="Select Profession"
                      :items="state.selector.profession" />
                  </VCol>

                  <!-- Yearly salary or Income -->
                  <VCol cols="12" md="6">
                    <VSelect v-model="state.form.personalDetails.salary" label="Yearly salary or Income"
                      placeholder="Select Yearly salary or Income" :items="state.selector.salary_range || []" />
                  </VCol>
                  <!-- Region -->
                  <!-- <VCol cols="12" md="6">
                    <VSelect v-model="state.form.personalDetails.region" label="Region" placeholder="Select Region"
                      :items="state.regions" />
                  </VCol> -->


                  <!-- Council -->
                  <!-- <VCol cols="12" md="6">
                    <VSelect v-model="personalDetails.council" label="Council" placeholder="Select Council"
                      :items="['English', 'Spanish', 'Arabic', 'Hindi', 'Urdu']" />
                  </VCol> -->

                  <!-- House Type -->
                  <VCol cols="12" md="6">
                    <VSelect v-model="personalDetails.houseType" label="House Type" placeholder="Select House Type"
                      :items="state.selector.house_type" />
                  </VCol>

                  <!-- Marital Status -->
                  <VCol cols="12" md="6">
                    <VSelect v-model="personalDetails.marital_status" label="Marital Status"
                      placeholder="Select Marital Status" :items="state.selector.marital_status" />
                  </VCol>

                  <!-- Gender -->
                  <VCol cols="12" md="6">
                    <VSelect v-model="personalDetails.gender" label="Gender" placeholder="Select Gender"
                      :items="state.selector.gender" />
                  </VCol>
                  <!-- Religious Mazhab -->
                  <VCol cols="12" md="6">
                    <VSelect v-model="personalDetails.religious_mazhab" label="Religious Mazhab"
                      placeholder="Select Religious Mazhab" :items="state.selector.religious_mazhab" />
                  </VCol>

                  <!-- Religious Practice -->
                  <VCol cols="12" md="6">
                    <VSelect v-model="personalDetails.religious_practice" label="Religious Practice"
                      placeholder="Select Religious Practice" :items="state.selector.religious_practice" />
                  </VCol>

                  <!-- Prayers -->
                  <VCol cols="12" md="6">
                    <VSelect v-model="personalDetails.prayers" label="Prayers" placeholder="Select Prayers"
                      :items="state.selector.prayers" />
                  </VCol>


                  <!-- When was the last time you prayed Fajr? -->
                  <VCol cols="12" md="6">
                    <VSelect v-model="personalDetails.last_fajr_prayer" label="When was the last time you prayed Fajr?"
                      placeholder="Select When was the last time you prayed Fajr?"
                      :items="state.selector.lastFajrOptions" />
                  </VCol>

                  <!-- Do you know how to recite the Quran? -->
                  <VCol cols="12" md="6">
                    <VSelect v-model="personalDetails.can_recite_quran" label="Do you know how to recite the Quran?"
                      placeholder="Select Do you know how to recite the Quran?"
                      :items="state.selector.quranRecitationOptions" />
                  </VCol>

                  <!-- When was the last time you read the Quran? -->
                  <VCol cols="12" md="6">
                    <VSelect v-model="personalDetails.last_read_quran"
                      label="When was the last time you read the Quran?"
                      placeholder="Select When was the last time you read the Quran?"
                      :items="state.selector.quranReadingOptions" />
                  </VCol>

                  <!-- Do you have a driving license? -->
                  <VCol cols="12" md="6">
                    <VSelect v-model="personalDetails.driving_license" label="Do you have a driving license?"
                      placeholder="Select Do you have a driving license?" :items="state.selector.has_driving_license" />
                  </VCol>

                  <!-- Do you own a car? -->
                  <VCol cols="12" md="6">
                    <VSelect v-model="personalDetails.owns_car" label="Do you own a car?"
                      placeholder="Select Do you own a car?" :items="state.selector.carOwnershipOptions" />
                  </VCol>

                  <!-- Disability -->
                  <VCol cols="12" md="6">
                    <VSelect v-model="personalDetails.disability" label="Disability" placeholder="Select Disability"
                      :items="state.selector.disability" />
                  </VCol>

                  <!-- Umrah/Hajj -->
                  <VCol cols="12" md="6">
                    <VSelect v-model="personalDetails.umrah_hajj" label="Umrah/Hajj" placeholder="Select Umrah/Hajj"
                      :items="state.selector.umrahHajjOptions" />
                  </VCol>

                  <!-- Language -->
                  <VCol cols="12" md="6">
                    <VSelect v-model="personalDetails.language" label="Language" placeholder="Select Language"
                      :items="state.selector.language" />
                  </VCol>

                  <!-- Marriage Intentions -->
                  <VCol cols="12" md="6">
                    <VSelect v-model="personalDetails.marriage_intentions" label="Marriage Intentions"
                      placeholder="Select Marriage Intentions" :items="state.selector.marriage_intentions" />
                  </VCol>

                  <!-- Do you wear religious dress? -->
                  <VCol cols="12" md="6">
                    <VSelect v-model="personalDetails.wear_religious_dress" label="Do you wear religious dress?"
                      placeholder="Select Do you wear religious dress?"
                      :items="state.selector.wearReligiousDressOptions" />
                  </VCol>
                  <!-- Smoking -->
                  <VCol cols="12" md="6">
                    <VSelect v-model="personalDetails.smoking" label="Smoking" placeholder="Select Smoking"
                      :items="state.selector.smoking" />
                  </VCol>
                  <!-- Do you know cooking? -->
                  <VCol cols="12" md="6">
                    <VSelect v-model="personalDetails.cooking_skills" label="Do you know cooking?"
                      placeholder="Select Do you know cooking?" :items="state.selector.cookingOptions" />
                  </VCol>
                  <!-- Form Actions -->
                  <VCol cols="12" class="d-flex flex-wrap gap-4">
                    <VBtn @click="submitForm">Save changes</VBtn>
                    <!-- <VBtn color="secondary" variant="tonal" type="reset" @click.prevent="resetForm">Reset</VBtn> -->
                  </VCol>
                </VRow>
              </VForm>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </ElTabPane>
    <!-- Tab 2: Spouse Expectation -->
    <ElTabPane label="Spouse Expectation" name="spouse-expectation">
      <VCol cols="12">
        <VCard title="Spouse Expectation">
          <VCardText>
            <VForm class="mt-6">
              <VRow>
                <!-- Citizen -->
                <VCol cols="12" md="6">
                  <VSelect v-model="spouseExpectation.spouse_citizen" label="Citizen"
                    :items="state.selector.spouse_citizenship" placeholder="Select Citizen" />
                </VCol>

                <!-- Occupation Preference -->
                <VCol cols="12" md="6">
                  <VSelect v-model="spouseExpectation.spouse_occupationOptions" label="Occupation Preference"
                    :items="state.selector.cookingOptions" placeholder="Select Occupation Preference" />
                </VCol>

                <!-- Skin Colour -->
                <VCol cols="12" md="6">
                  <VSelect v-model="spouseExpectation.spouse_skinColour" label="Skin Colour"
                    placeholder="Select Skin Colour" :items="state.selector.spouse_skinColourOptions" />
                </VCol>

                <!-- Height Preference -->
                <VCol cols="12" md="6">
                  <VSelect v-model="spouseExpectation.spouse_heightPreference" label="Height Preference"
                    placeholder="Select Height Preference" :items="state.selector.spouse_heightOptions" />
                </VCol>

                <!-- Education Preference -->
                <VCol cols="12" md="6">
                  <VSelect v-model="spouseExpectation.spouse_educationPreference" label="Education Preference"
                    placeholder="Select Education Preference" :items="state.selector.spouse_educationOptions" />
                </VCol>

                <!-- Religious Dress Preference -->
                <VCol cols="12" md="6">
                  <VSelect v-model="spouseExpectation.spouse_religiousDress" label="Religious Dress Preference"
                    placeholder="Select Religious Dress Preference"
                    :items="state.selector.spouse_religious_dress_preference" />
                </VCol>

                <!-- Age -->
                <VCol cols="12" md="6">
                  <VSelect v-model="spouseExpectation.spouse_agePreference" label="Age" placeholder="Select Age"
                    :items="state.selector.age_group" />
                </VCol>

                <!-- Area of Choice -->
                <!-- <VCol cols="12" md="6">
                  <VSelect v-model="spouseExpectation.spouse_areaOfChoice" label="Area of Choice"
                    placeholder="Select Area of Choice" :items="state.selector.cookingOptions" />
                </VCol> -->

                <!-- Prefer Council -->
                <!-- <VCol cols="12" md="6">
                  <VSelect v-model="spouseExpectation.spouse_preferCouncil" label="Prefer Council"
                    placeholder="Select Prefer Council" :items="state.selector.cookingOptions" />
                </VCol> -->

                <!-- Marital Status -->
                <VCol cols="12" md="6">
                  <VSelect v-model="spouseExpectation.spouse_marital_status" label="Marital Status"
                    placeholder="Select Marital Status" :items="state.selector.spouse_marital_status" />
                </VCol>

                <!-- Consider Divorce -->
                <VCol cols="12" md="6">
                  <VSelect v-model="spouseExpectation.spouse_considerDivorce" label="Consider Divorce"
                    placeholder="Select Consider Divorce" :items="state.selector.spouse_consider_divorce" />
                </VCol>

                <!-- Consider Divorce with Children -->
                <VCol cols="12" md="6">
                  <VSelect v-model="spouseExpectation.spouse_considerDivorceWithChildren"
                    label="Consider Divorce with Children" placeholder="Select Consider Divorce with Children"
                    :items="state.selector.spouse_consider_divorce_with_children" />
                </VCol>

                <!-- Consider with Disabilities -->
                <VCol cols="12" md="6">
                  <VSelect v-model="spouseExpectation.spouse_considerWithDisabilities"
                    label="Consider with Disabilities" placeholder="Select Consider with Disabilities"
                    :items="state.selector.spouse_consider_with_disabilities" />
                </VCol>
                <!-- Consider a Non-UK Citizen -->
                <VCol cols="12" md="6">
                  <VSelect v-model="spouseExpectation.spouse_consider_non_uk_citizen" label="Consider a Non-UK Citizen"
                    placeholder="Select Consider a Non-UK Citizen" :items="state.selector.cookingOptions" />
                </VCol>

                <!-- Willing to Relocate -->
                <VCol cols="12" md="6">
                  <VSelect v-model="spouseExpectation.spouse_willingToRelocate" label="Willing to Relocate"
                    placeholder="Select Willing to Relocate" :items="state.selector.spouse_willing_to_relocate" />
                </VCol>

                <!-- Living Arrangements -->
                <VCol cols="12" md="6">
                  <VSelect v-model="spouseExpectation.spouse_livingArrangements" label="Living Arrangements"
                    placeholder="Select Living Arrangements" :items="state.selector.spouse_livingArrangementsOptions" />
                </VCol>


                <!-- Wedding Plan -->
                <VCol cols="12" md="6">
                  <VSelect v-model="spouseExpectation.weddingPlan" label="Wedding Plan"
                    placeholder="Select Wedding Plan" :items="state.selector.wedding_plan" />
                </VCol>

                <!-- About yourself and spouse expectations -->
                <VCol cols="12" md="6">
                  <VTextField v-model="spouseExpectation.aboutYourself" label="About yourself and spouse expectations"
                    placeholder="Enter About yourself and spouse expectations" type="textarea" />
                </VCol>

                <!-- Form Actions -->
                <VCol cols="12" class="d-flex flex-wrap gap-4">
                  <VBtn @click="submitForm">Save changes</VBtn>
                  <!-- <VBtn color="secondary" variant="tonal" type="reset" @click.prevent="resetForm">Reset</VBtn> -->
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </ElTabPane>

    <!-- Tab 2: Family Information -->
    <ElTabPane label="Family Information" name="family-information">
      <VCol cols="12">
        <VCard title="Family Information">
          <VCardText>
            <VForm class="mt-6">
              <VRow>
                <!-- Parents -->
                <VCol cols="12" md="6">
                  <VSelect v-model="familyDetails.parents_status" label="Parents" placeholder="Select Parents"
                    :items="state.selector.parentsStatusOptions" />
                </VCol>

                <!-- Father Name -->
                <VCol md="6" cols="12">
                  <VTextField v-model="familyDetails.father_name" placeholder="John" label="Father Name" />
                </VCol>

                <!-- Mother Name -->
                <VCol md="6" cols="12">
                  <VTextField v-model="familyDetails.mother_name" placeholder="Doe" label="Mother Name" />
                </VCol>

                <!-- Siblings -->
                <VCol cols="12" md="6">
                  <VSelect v-model="familyDetails.siblings" label="Siblings"
                    :items="Array.from({ length: 16 }, (_, i) => i)" placeholder="Select Siblings" />
                </VCol>


                <!-- How many working people in your family? -->
                <VCol cols="12" md="6">
                  <VSelect v-model="familyDetails.working_members" label="How many working people in your family?"
                    :items="Array.from({ length: 11 }, (_, i) => i)"
                    placeholder="Select How many working people in your family?" />
                </VCol>


                <!-- Backhome City -->
                <VCol cols="12" md="6">
                  <VSelect v-model="familyDetails.backhome_city" label="Backhome City"
                    :items="state.selector.backhomeCityOptions" placeholder="Select Backhome City" />
                </VCol>


                <!-- Guardian Name -->
                <VCol md="6" cols="12">
                  <VTextField v-model="familyDetails.guardianName" placeholder="John" label="Guardian Name" />
                </VCol>

                <!-- Guardian WhatsApp Number -->
                <VCol md="6" cols="12">
                  <VTextField v-model="familyDetails.guardianWhatsApp" placeholder="Doe"
                    label="Guardian WhatsApp Number" />
                </VCol>
                <!-- Relationship with Guardian -->
                <VCol cols="12" md="6">
                  <VSelect v-model="familyDetails.guardianRelationship" label="Relationship with Guardian"
                    placeholder="Select Relationship with Guardian"
                    :items="state.selector.guardianRelationshipOptions" />
                </VCol>

                <!-- Form Actions -->
                <VCol cols="12" class="d-flex flex-wrap gap-4">
                  <VBtn @click="submitForm">Save changes</VBtn>
                  <!-- <VBtn color="secondary" variant="tonal" type="reset" @click.prevent="resetForm">Reset</VBtn> -->
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </ElTabPane>


  </ElTabs>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { SELECTOR_OPTION, GET_COUNCIL_DATA } from '@core/utils/apiEndpoints'
import Api from '@core/api/index'

const store = useStore();
const router = useRouter();


const basicInfo = ref({
  customerId: `Customer-${Date.now()}`,
  phone: '',
  email: '',
  password: '',
})
const personalDetails = ref({
  photo: '',
  name: '',
  role: '',
  age: 18,
  height: '',
  skin_colour: '',
  figure: '',
  citizenship: '',
  education: '',
  profession: '',
  salary: '',
  region: '',
  council: '',
  houseType: '',
  marital_status: '',
  gender: '',
  religious_mazhab: '',
  religious_practice: '',
  prayers: '',
  last_fajr_prayer: '',
  can_recite_quran: '',
  last_read_quran: '',
  driving_license: '',
  owns_car: '',
  disability: '',
  umrah_hajj: '',
  language: '',
  marriage_intentions: '',
  wear_religious_dress: '',
  smoking: '',
  cooking_skills: ''
})


const familyDetails = ref({
  parents_status: '',
  father_name: '',
  mother_name: '',
  siblings: '',
  working_members: '',
  backhome_city: '',
  guardianName: '',
  guardianRelationship: '',
  guardianWhatsApp: '',
})

const spouseExpectation = ref({
  spouse_citizen: '',
  spouse_occupation: '',
  spouse_skinColour: '',
  spouse_heightPreference: "",
  spouse_educationPreference: "",
  spouse_religiousDress: '',
  spouse_agePreference: '',
  spouse_areaOfChoice: '',
  spouse_preferCouncil: '',
  spouse_marital_status: '',
  spouse_considerDivorce: '',
  spouse_considerDivorceWithChildren: '',
  spouse_considerWithDisabilities: '',
  spouse_considerNonUkCitizen: '',
  spouse_willingToRelocate: '',
  spouse_livingArrangements: '',
  weddingPlan: '',
  aboutYourself: '',
})


const state = reactive({
  form: {
    basicInfo,
    personalDetails,
    familyDetails,
    spouseExpectation,
  },
  fileList: [],
  images: [],
  formErrors: {},
  selector: [],
  regions: [],
  councils: [],
  areaCouncils: [],
  previewImg:null,
});

const fetchSelector = async () => {
  try {
    const response = await Api.get(SELECTOR_OPTION);
    state.selector = response.data.options;
    state.regions = response.data.regions;
  } catch (error) {
    console.error('Error fetching selector options:', error.response?.data);

  }
};

const fetchCouncil = async (newValue) => {
  try {
    const url = GET_COUNCIL_DATA.replace(':region', newValue)
    const response = await Api.get(url);
    state.councils = response.data.councils;
  } catch (error) {
    console.error('Error fetching selector options:', error.response ? error.response.data : error.message);
  }
}
watch(() => personalDetails.value.region, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    console.log(newValue);
    fetchCouncil(newValue);
  }
});
const fetchAreaCouncil = async (newValue) => {
  try {
    const url = GET_REGION_DATA.replace(':region', newValue)
    const response = await Api.get(url);
    state.areaCouncils = response.data.councils;
    console.log('hilo', state.areaCouncils);
  } catch (error) {
    console.error('Error fetching selector options:', error.response ? error.response.data : error.message);
  }
}
watch(
  () => spouseExpectation.value.spouse_areaOfChoice,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      console.log('Area of Choice changed to:', newValue);
      fetchAreaCouncil(newValue);
    }
  }
);

const submitForm = async () => {
  try {
    const customerId = router.currentRoute.value.params.id;
    const response = await store.dispatch('customer/updateCustomer', { id: customerId, data: state.form });
    fetchCustomerDetails();
  } catch (error) {
    console.log(error);
  }
};




const user = computed(() => store.getters['customer/getCustomerDetails']);

watch(()=> user.value, (newValue) => {
  if (newValue) {
    populateForm();
  }
})

const populateForm = async () => {
  const userData = user.value;
  state.previewImg = userData.primary_image_url;
  basicInfo.value = {
    customerId: userData.customerId,
    phone: userData.phone || '',
    email: userData.email || '',
    password: '',
  };
  personalDetails.value = {
    photo: userData.primary_image_url,
    name: userData.profile?.name || '',
    role: userData.profile?.role || '',
    age: userData.profile?.age || 18,
    height: userData.profile?.height || '',
    skin_colour: userData.profile?.skin_colour || '',
    figure: userData.profile?.figure || '',
    citizenship: userData.profile?.citizenship || '',
    education: userData.profile?.education || '',
    profession: userData.profile?.profession || '',
    salary: userData.profile?.salary || '',
    region: userData.profile?.region || '',
    council: userData.profile?.council || '',
    houseType: userData.profile?.houseType || '',
    marital_status: userData.profile?.marital_status || '',
    gender: userData.profile?.gender || '',
    religious_mazhab: userData.profile?.religious_mazhab || '',
    religious_practice: userData.profile?.religious_practice || '',
    prayers: userData.profile?.prayers || '',
    last_fajr_prayer: userData.profile?.last_fajr_prayer || '',
    can_recite_quran: userData.profile?.can_recite_quran || '',
    last_read_quran: userData.profile?.last_read_quran || '',
    driving_license: userData.profile?.driving_license || '',
    owns_car: userData.profile?.owns_car || '',
    disability: userData.profile?.disability || '',
    umrah_hajj: userData.profile?.umrah_hajj || '',
    language: userData.profile?.language || '',
    marriage_intentions: userData.profile?.marriage_intentions || '',
    wear_religious_dress: userData.profile?.wear_religious_dress || '',
    smoking: userData.profile?.smoking || '',
    cooking_skills: userData.profile?.cooking_skills || '',
  };

  familyDetails.value = {
    parents_status: userData.profile?.parents_status || '',
    father_name: userData.profile?.father_name || '',
    mother_name: userData.profile?.mother_name || '',
    siblings: userData.profile?.siblings || '',
    working_members: userData.profile?.working_members || '',
    backhome_city: userData.profile?.backhome_city || '',
    guardianName: userData.profile.guardianName || '',
    guardianRelationship: userData.profile?.guardianRelationship || '',
    guardianWhatsApp: userData.profile?.guardianWhatsApp || '',
  };


  spouseExpectation.value = {
    spouse_citizen: userData.profile?.spouse_citizen || '',
    spouse_occupation: userData.profile?.spouse_occupation || '',
    spouse_skinColour: userData.profile?.spouse_skinColour || '',
    spouse_heightPreference: userData.profile?.spouse_heightPreference || '',
    spouse_educationPreference: userData.profile?.spouse_educationPreference || '',
    spouse_religiousDress: userData.profile?.spouse_religiousDress || '',
    spouse_agePreference: userData.profile?.spouse_agePreference || '',
    spouse_areaOfChoice: userData.profile?.spouse_areaOfChoice || '',
    spouse_preferCouncil: userData.profile?.spouse_preferCouncil || '',
    spouse_marital_status: userData.profile?.spouse_marital_status || '',
    spouse_considerDivorce: userData.profile?.spouse_considerDivorce || '',
    spouse_considerDivorceWithChildren: userData.profile?.spouse_considerDivorceWithChildren || '',
    spouse_considerWithDisabilities: userData.profile?.spouse_considerWithDisabilities || '',
    spouse_considerNonUkCitizen: userData.profile?.spouse_considerNonUkCitizen || '',
    spouse_willingToRelocate: userData.profile?.spouse_willingToRelocate || '',
    spouse_livingArrangements: userData.profile?.spouse_livingArrangements || '',
    weddingPlan: userData.profile?.weddingPlan || '',
    aboutYourself: userData.profile?.aboutYourself || '',
  };
};


const activeTab = ref('account-details')
const refInputEl = ref()

const resetAvatar = () => {
  personalDetails.value.photo = user.value.primary_image_url; 
  state.previewImg = user.value.primary_image_url;
};

// Handle file input for uploading a new avatar
const changeAvatar = file => {
  const fileReader = new FileReader();
  const { files } = file.target;
  if (files && files.length) {
    const selectedFile = files[0];
    personalDetails.value.photo = selectedFile;
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
         state.previewImg = fileReader.result; 
      }
    };
  }
};


const fetchCustomerDetails = async () => {
  const customerId = router.currentRoute.value.params.id; 
  if (customerId) {
    await store.dispatch('customer/fetchDetails', customerId);
  } else {
    console.error("No customer ID found in route parameters.");
  }
}

const mount = async () => {
  fetchSelector();
  await fetchCustomerDetails();
  populateForm();
}
onMounted(mount);
</script>

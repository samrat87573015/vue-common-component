<template>
  <div class="w-full max-w-md space-y-4">
    <vue-tel-input
      v-model="phone"
      :default-country="defaultCountry"
      mode="international"
      :inputOptions="{ 
        placeholder: 'Enter a phone number',
        class: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
        type: 'tel' // Ensures a numeric keyboard on mobile devices
      }"
      :dropdownOptions="{
        showSearchBox: true,
        searchBoxPlaceholder: 'Search countries',
        showFlags: true,
        showDialCodeInList: true
      }"
      @input="onInput"
      @validate="onValidate"
      @country-changed="onCountryChange"
    >
    </vue-tel-input>

    <span v-if="isValid === false" class="text-sm text-red-600">Invalid phone number</span>

    <div class="text-sm space-y-1">
      <p>
        <span class="text-gray-600">Formatted:</span>
        <span class="font-mono ml-2">{{ formattedNumber }}</span>
      </p>
      <p>
        <span class="text-gray-600">Is valid:</span>
        <span 
          class="font-mono ml-2"
          :class="isValid ? 'text-green-600' : 'text-red-600'"
        >
          {{ isValid }}
        </span>
      </p>
      <p>
        <span class="text-gray-600">Country:</span>
        <span class="font-mono ml-2">{{ selectedCountry?.name }}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';

const phone = ref(''); // Holds the user's input
const isValid = ref(false); // Validity of the phone number
const formattedNumber = ref(''); // Formatted phone number
const selectedCountry = ref(null); // Country data
const defaultCountry = 'BD'; // Default country is Bangladesh

// Ensures the input always starts with the country code and '+'
const ensurePlusSign = () => {
  if (selectedCountry.value && !phone.value.startsWith('+')) {
    phone.value = `+${selectedCountry.value.dialCode}`;
  }
};

// Handles user input to ensure only numeric values and '+' are allowed
const onInput = () => {
  // Remove any character that isn't a digit or '+'
  phone.value = phone.value.replace(/[^+\d]/g, '');

  // Ensure it starts with the country code and '+'
  ensurePlusSign();
};

// Validates the phone number
const onValidate = ({ valid, formatted, country }) => {
  isValid.value = valid;
  formattedNumber.value = valid ? formatted : '';
};

// Updates the country and adds the country code to the input
const onCountryChange = (country) => {
  selectedCountry.value = country;

  // Add the selected country's dial code with `+` to the phone input
  if (country?.dialCode) {
    phone.value = `+${country.dialCode}`;
  }
};
</script>

<style scoped>
/* Custom styling for the tel input */
:deep(.vue-tel-input) {
  @apply border-0;
}

:deep(.vti__dropdown) {
  @apply border border-gray-300 rounded-l-md hover:bg-gray-50;
}

:deep(.vti__dropdown.open) {
  @apply border-blue-500;
}

:deep(.vti__selection) {
  @apply text-gray-900;
}

:deep(.vti__input) {
  @apply border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}

:deep(.vti__search-box) {
  @apply border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}
</style>

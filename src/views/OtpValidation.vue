<script setup>
import { ref, computed, onMounted } from "vue";

    const otp = ref(["", "", "", "", "", ""]);
    const timer = ref(180); // Timer in seconds (3 minutes)

    // Format the timer into MM:SS format
    const formattedTime = computed(() => {
      const minutes = String(Math.floor(timer.value / 60)).padStart(2, "0");
      const seconds = String(timer.value % 60).padStart(2, "0");
      return `${minutes}:${seconds}`;
    });

    // Countdown timer
    const startTimer = () => {
      const interval = setInterval(() => {
        if (timer.value > 0) {
          timer.value--;
        } else {
          clearInterval(interval);
        }
      }, 1000);
    };

    // if time is over reset button is visible
    const isTimeOver = computed(() => {
      return timer.value <= 0;
    })

    const resetTimer = () => {
      timer.value = 180;
      startTimer();
    };


    const handleInput = (index, event) => {
      const value = event.target.value;

      // Allow only single digit numbers
      if (/^\d$/.test(value)) {
        otp.value[index] = value;

        // Automatically move to the next input if it's not the last
        if (index < otp.value.length - 1) {
          document.querySelectorAll("input")[index + 1].focus();
        }
        else if (key === "deleteContentBackward") {
          // Handle backspace logic
          otp.value[index] = "";

          // Automatically move to the previous input if the current input is empty
          if (index > 0) {
            document.querySelectorAll("input")[index - 1].focus();
          }
        }

      } else {
        // Clear the input if invalid value
        otp.value[index] = "";
      }
    };

    const otpCodeValue = ref("");

    // Verify OTP function
    const verifyOtp = () => {
      const otpCode = otp.value.join("");
      if (otpCode.length === 6) {
        otpCodeValue.value = otpCode;
      } else {
        alert("Please fill all OTP fields!");
      }
    };

    onMounted(() => {
      startTimer();
    });

</script>


<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white rounded-lg shadow-lg p-6 w-80">
      <div class="flex flex-col items-center">
        <div class="text-red-500 text-3xl mb-2">🔒</div>
        <h2 class="text-lg font-semibold mb-2">OTP Verification</h2>
        <p class="text-sm text-gray-600 text-center mb-4">
          We have sent an OTP to the given number <br />
          <span class="font-semibold">+90 555 555 555</span>
        </p>
        <div class="text-green-500 text-lg font-semibold mb-4">{{ formattedTime }}</div>
        <div class="flex space-x-2 mb-4">
          <input
            v-for="(digit, index) in otp"
            :key="index"
            :disabled ="isTimeOver"
            :class="{ 'bg-gray-200 cursor-not-allowed': isTimeOver }"
            type="text"
            maxlength="1"
            v-model="otp[index]"
            @input="handleInput(index, $event)"
            class="w-10 h-12 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none appearance-none"
          /> 
        </div>
        <div class="resend_otp mb-5" v-if="isTimeOver">
          <span class="text-gray-600 text-sm">
            Don't receive the code?
            <button
              class="text-red-500 font-bold"
              @click="resetTimer"
            >
              Resend OTP
            </button>
          </span>
        </div>
        <button
          @click="verifyOtp"
          class="bg-red-500 text-white py-2 px-4 w-full rounded-lg hover:bg-red-600 transition"
        >
          Next
        </button> 

        {{ otpCodeValue }}
      </div>
    </div>
  </div>
</template>

<style scoped>

/* Remove spinner for number inputs */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield; /* For Firefox */
  appearance: textfield; /* Ensures consistency */
}

</style>


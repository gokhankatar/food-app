<template>
  <Loading v-if="isLoading" />

  <v-row v-if="!isLoading" class="d-flex flex-wrap justify-center justify-md-start">
    <v-col cols="12" sm="8" md="4" v-for="(item, index) of foodArr" :key="index">
      <v-card class="card cursor-pointer position-relative" height="360">
        <v-icon
          @click="deleteFood(item.id)"
          class="delete-icon cursor-pointer"
          color="red darken-1"
          icon="mdi-delete"
        />
        <v-img class="card-image" :src="item.image" height="200" cover />
        <v-card-content class="d-flex flex-column align-center align-md-start pa-2 ga-2">
          <v-card-title>{{ item.meal.toUpperCase() }}</v-card-title>
          <div class="d-flex flex-wrap ga-1">
            <p v-for="item of item.foods">
              <v-chip
                :class="_store.theme === 'light' ? 'bg-red-darken-1' : 'bg-red-lighten-2'"
                >{{ item }}</v-chip
              >
            </p>
          </div>
          <v-card-subtitle class="time">
            {{
              typeof item.date === "object"
                ? formattedDate(item.date.toDate())
                : item.date
            }}
          </v-card-subtitle>
        </v-card-content>
      </v-card>
    </v-col>
  </v-row>

  <!-- form -->
  <v-dialog v-model="_store.isAddingFood" max-width="600">
    <v-form
      class="form rounded-xl pa-10 d-flex flex-column ga-2"
      @submit.prevent="validate"
      ref="formRef"
    >
      <v-select
        v-model="models.meal"
        :items="meals"
        :rules="modelRules.meal"
        label="Meal"
        :color="_store.theme === 'light' ? 'red-darken-1' : 'red-lighten-2'"
        variant="outlined"
        rounded="xl"
        clearable
      />
      <v-combobox
        :rules="modelRules.foods"
        v-model="models.foods"
        rounded="xl"
        :items="allFodds"
        label="Food"
        :color="_store.theme === 'light' ? 'red-darken-1' : 'red-lighten-2'"
        variant="outlined"
        chips
        multiple
        clearable
      />
      <v-text-field
        :rules="modelRules.foodImgUrl"
        v-model="models.foodImgUrl"
        rounded="xl"
        :color="_store.theme === 'light' ? 'red-darken-1' : 'red-lighten-2'"
        type="text"
        label="Food Image"
        variant="outlined"
      />
      <v-btn
        class="bg-success border-none"
        type="submit"
        variant="outlined"
        rounded="xl"
        block
        >Add</v-btn
      >
      <v-btn
        @click="_store.closeAddFood"
        class="bg-warning border-none"
        variant="outlined"
        rounded="xl"
        block
        >Cancel</v-btn
      >
    </v-form>
  </v-dialog>
</template>

<script setup>
import moment from "moment";
import { ref, onMounted, reactive } from "vue";
import store from "../store/pinia";
import Loading from "../components/Loading.vue";
import allFodds from "../utils/allFodds";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

const _store = store();

const isLoading = ref(false);

const meals = ["breakfast", "lunch", "snack", "dinner"];
const formRef = ref(null);
const foodArr = ref([]);

const models = ref({
  meal: "",
  foodImgUrl: "",
  foods: null,
});

const modelRules = reactive({
  meal: [(v) => !!v || "Meal  is required!"],
  foodImgUrl: [(v) => !!v || "Image  is required!"],
  foods: [(v) => !!v || "Food/Foods is required!"],
});

const db = getFirestore();
const colRef = collection(db, "foodArr");

const formattedDate = (date) => {
  return moment(date).format("MMMM Do YYYY, h:mm:ss a");
};

const getFoods = async () => {
  try {
    isLoading.value = true;
    const q = query(colRef, orderBy("date"));
    const snapshot = await getDocs(q);
    snapshot.docs.forEach((doc) => {
      foodArr.value.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    isLoading.value = false;
  } catch (error) {
    console.error(error.message);
  }
};

const deleteFood = async (id) => {
  try {
    // delete from Database
    const docRef = doc(db, "foodArr", id);
    await deleteDoc(docRef);

    // delete from DOM
    foodArr.value = foodArr.value.filter((food) => id !== food.id);
  } catch (error) {
    console.error(error.message);
  }
};

const addFood = async () => {
  try {
    // add into database
    const docRef = await addDoc(colRef, {
      meal: models.value.meal,
      image: models.value.foodImgUrl,
      foods: models.value.foods,
      date: serverTimestamp(),
    });

    // add into dom
    foodArr.value.push({
      meal: models.value.meal,
      image: models.value.foodImgUrl,
      foods: models.value.foods,
      id: docRef.id,
      date: new Date(),
    });

    _store.closeAddFood();
    formRef.value.reset();
  } catch (error) {
    console.error(error.message);
  }
};

const validate = async () => {
  const { valid } = await formRef.value.validate();

  if (valid) {
    addFood();
  }
};

onMounted(() => {
  getFoods();
});
</script>
<style scoped>
.delete-icon {
  position: absolute;
  z-index: 999;
  top: 2%;
  right: 1%;
}

.form {
  box-shadow: 0 0 1.5rem red;
  background: rgba(114, 94, 94, 0.767);
}

.time {
  position: absolute;
  bottom: 2%;
}

.card {
  overflow: hidden;
}

.card-image {
  transition: transform 0.3s ease;
}

.card:hover .card-image {
  transform: scale(1.1);
}
</style>

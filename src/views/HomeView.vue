<template>
  <div class="home">


      <!-- Edit user modal -->
      <div class="overlay" v-if="this.openedEditModal === true">
        <div class="add-user-modal"> 
          <h3>Редактирай потребител</h3>
          <div class="group">
            <label class="label">Име</label>
            <input type="text" class="input" v-model="this.nameInputValue">
          </div>

          <div class="group">
            <label class="label">Фамилия</label>
            <input type="text" class="input" v-model="this.surnameInputValue">
          </div>

          <div class="group">
            <label class="label">Телефон</label>
            <input type="text" class="input" v-model="this.phoneInputValue">
          </div>

          <div class="group">
            <label class="label">Адрес</label>
            <input type="text" class="input" v-model="this.addressInputValue">
          </div>

          <button class="defaultBtn" @click="editUser()">Запази промените</button>

          <button class="defaultBtn" @click="removeUser()">Изтрий потребител</button>

          <button class="defaultBtn" @click="closeEditModal()">Отказ</button>

        </div>
      </div>

      <!-- Create user modal -->
      <div class="overlay" v-if="this.openedCreateModal === true">
        <div class="add-user-modal"> 
          <h3>Създай потребител</h3>
          <div class="group">
            <label class="label">Име</label>
            <input type="text" class="input" v-model="this.nameInputValue">
          </div>

          <div class="group">
            <label class="label">Фамилия</label>
            <input type="text" class="input" v-model="this.surnameInputValue">
          </div>

          <div class="group">
            <label class="label">Телефон</label>
            <input type="text" class="input" v-model="this.phoneInputValue">
          </div>

          <div class="group">
            <label class="label">Адрес</label>
            <input type="text" class="input" v-model="this.addressInputValue">
          </div>

          <button class="defaultBtn" @click="addUser()">Добави потребител</button>

          <button class="defaultBtn" @click="closeCreateModal()">Отказ</button>

        </div>
      </div>


      <div class="table-wrapper">

        <h1> Perspective web task </h1>

      <input class="searchInput" v-model="searchUser" placeholder="Търси по име/телефон" style="margin: 20px; height: 30px; width: 200px; border: 1px solid black; border-radius: 10px;">
        <table>
          
          <thead>

              <th id="one">Име</th>
              <th id="two">Фамилия</th>
              <th id="three">Телефон</th>
              <th id="four">Адрес</th>
          </thead>


          <tbody>
            <tr v-for="(phoneBook, index) in filteredUser" :key="index">
              <td @click="editEntry(index)">{{phoneBook.name}}</td>
              <td @click="editEntry(index)">{{phoneBook.surname}}</td>
              <td @click="editEntry(index)">{{phoneBook.phone}}</td>
              <td @click="editEntry(index)">{{phoneBook.address}}</td>
            </tr>

          </tbody>
        </table>
      </div>

      <button class="defaultBtn" @click="this.openedCreateModal = true">Създай</button>


  </div>
</template>

<script>

export default {
  name: 'HomeView',
  data() {
    return {
      searchUser: '',
      editUserIndex: 0,
      openedEditModal: false,
      openedCreateModal: false,
      phoneBooks: [
        {name: "Иван", surname: "Петков", phone: "0876091723", address: "София ул. Македонска"},
        {name: "Добри", surname: "Иванов", phone: "0887463543", address: "Бургас ул.Солунска"},
        {name: "Димитър", surname: "Димитров", phone: "0883287147", address: "Пловдив ул.Демокрация"}
      ],
      filteredPhoneBooks: [],
      nameInputValue: '',
      surnameInputValue: '',
      phoneInputValue: '',
      addressInputValue: ''
     }
  },
  methods: {

    //Adding new user
    addUser(){
      let newUserData = {name: this.nameInputValue, surname: this.surnameInputValue, phone: this.phoneInputValue, address: this.addressInputValue}

      this.phoneBooks.push(newUserData)

      this.openedCreateModal = false
    },
    //Remove user
    removeUser() {
      this.openedEditModal = false

      this.phoneBooks.splice(this.editUserIndex, 1)
    },

    //Loading the selected user data for edit
    editEntry(itemIndex){
      this.openedEditModal = true

      this.editUserIndex = itemIndex

      this.nameInputValue = this.phoneBooks[itemIndex].name
      this.surnameInputValue = this.phoneBooks[itemIndex].surname
      this.phoneInputValue = this.phoneBooks[itemIndex].phone
      this.addressInputValue = this.phoneBooks[itemIndex].address
    },

    //Editing the selected user
    editUser(){
      this.phoneBooks[this.editUserIndex].name = this.nameInputValue
      this.phoneBooks[this.editUserIndex].surname = this.surnameInputValue
      this.phoneBooks[this.editUserIndex].phone = this.phoneInputValue
      this.phoneBooks[this.editUserIndex].address = this.addressInputValue

      this.openedEditModal = false
    },

    //Close modal
    closeEditModal(){
      this.openedEditModal = false
    },
    closeCreateModal(){
      this.openedCreateModal = false
    }
  },
  //Adding users to filtered array so we can filter by name and phone
  created(){
    this.filteredPhoneBooks = this.phoneBooks
  },
  computed: {
    // Add to the games array
    filteredUser: function(){

      if (this.searchUser.charAt(0) === "0") 
      {
         return this.filteredPhoneBooks.filter((user)=>{
           console.log("phone")
          return user.phone.match(this.searchUser);   
         })
      }
      else
      {
        return this.filteredPhoneBooks.filter((user)=>{
          console.log("name")
          return user.name.match(this.searchUser) 
        })
      }
    }
  }
}
</script>


<style scoped lang="scss">

  .table-wrapper {
    padding: 0 10px;
  }
  table {
    margin: 0 auto;
    border-collapse: collapse;
    background-color: #34495e;
    border: none;
    color: #ffffff;
    border-radius: 10px;
  }

  h1 {
    color: black;
    font-size: 2rem;
    font-weight: bold;
    text-transform: uppercase;
    margin: 15px;
  }
  th {
    color: white;
  }
  tr{
    
    cursor: pointer;
    &:hover{
      background: #476686;
    }
  }

  th,
  td {
    padding: 15px;
    border-bottom: 1px solid #f0f0f0;
    text-align: center;
  }

  .defaultBtn{
    padding: 10px 30px 10px 30px;
    font-size: 1rem;
    color: white;
    background: #34495e;
    border: none;
    cursor: pointer;

    &:hover{
      background: #476686;
    }
  }

  .overlay{
    position: fixed;
    background: rgba(0, 0, 0, 0.67);
    height: 100%;
    width: 100%;
     z-index: 20;
  }

  .add-user-modal{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 102;
    background: black;
    border-radius: 10px;
    height: auto;
    width: 30%;
    color: white;
    display: flex;
    flex-direction: column;
    justify-items: center;
    justify-content: center;
    z-index: 22;
  }

  .group{
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 20px 20px 20px;
  }

  .input{
    border: none;
    border-radius: 5px;
    padding: 10px 30px 10px 30px;
    margin-bottom: 10px;
  }


  @media (max-width: 1000px) {
    thead {
      display: none;
    }
    table tr {
      display: block;
      margin-bottom: 20px;
      border-bottom: 1px dashed #fefefe;
    }
    table {
      width:100%;
    }
    table tr:last-child {
      border-bottom: 0;
    }
    th,
    td {
      display: block;
      white-space: no-wrap;
      border: 0;
    }
    td {
      text-align: right;
      padding-left:50%;
      position:relative;
      margin-left:5px;
    }
    td:before {
      position:absolute;
      top:10px;
      left:10px;
      content: attr(data-lable);
      text-align: left;
      text-transform: uppercase;
      font-weight: bold;
      color: #dd5;
      max-width:50%;
      width:100%;
  }

  .add-user-modal{
    width: 80%;
  }
}

</style>
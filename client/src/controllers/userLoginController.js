import axios from "axios"

export default {
    getUser(email, password) {

        axios.post("http://localhost:8080/api/login", newUser, {
            headers: {
                "Content-type": "application/json"
            }
        }).then((res) => {
            this.resultString = res.data.message

            let ResultStringElement = document.querySelector('.resultString p');
            if (res.data.statusCode == 200) {
                ResultStringElement.style.color = 'green';
                router.push({ path: '/mainpage' })
            } else if (res.data.statusCode == 201) {
                this.sendEmailAgain = true
                this.viewInput = false
                ResultStringElement.style.color = 'green';
            }

        }).catch((err) => {
            console.log(err)
        })
    }

}
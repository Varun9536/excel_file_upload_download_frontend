import axios from "axios"
import { useState } from "react"
import "./App.css"
import Fileslist from "./components/Fileslist"

import { useEffect } from "react"

function App() {

  const [file, setfile] = useState("")
  const [list, setlist] = useState("")

  const sentfile = async () => {

    try {


      const formData = new FormData()
      formData.append("file", file)
      await axios.post("http://localhost:3000/v1/file", formData)

      file_list()

    } catch (error) {
      confirm.log("error", error)
    }


  }



  const file_list = async () => {


    try {
      let result = await fetch("http://localhost:3000/v1/getfile")

      result = await result.json()

      setlist(result.data)
    } catch (error) {
      console.log("error", error)
    }

  }


  useEffect(() => {
    file_list()
  }, [])







  return (
    <>
      <div style={{ textAlign: "center", fontSize: "25px", fontWeight: "bold", fontFamily: "cursive", height: "100px", paddingTop: "30px", background: "#99d6ff" }} className="page_heading">Download and Upload Excel files</div>
      <div className="maincontainer">

        <div className="upload">

          <div style={{ textAlign: "center", fontSize: "25px", fontFamily: "cursive" }}>Upload Excel file</div>

          <input style={{ margin: "40px 8px", fontSize: "18px" }} type="file" name="excelFile" id="file_input" accept=".xls,.xlsx" onChange={(e) => setfile(e.target.files[0])} />


          <div style={{ textAlign: "center" }}>
            <button style={{ width: "100px", padding: "5px 10px", fontSize: "20px", background: " #009933", color: "white", border: "none", borderRadius: "10px" }} onClick={sentfile}>upload</button>
          </div>

        </div>


        <div className="download">
          <Fileslist list={list} />
        </div>


      </div>



    </>
  )
}

export default App

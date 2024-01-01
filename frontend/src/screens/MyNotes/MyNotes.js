import { Link, useNavigate } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import { Button, Badge, Card, Accordion } from "react-bootstrap";
// import notes ,{ } from "../../data/notes";
// import MyNotes from './MyNotes';
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
// import {} frm "../../components/Loading"
import Loading from './../../components/Loading';
import ErrorMessage from './../../components/ErrorMessage';



const MyNotes=({search})=>{
  //take notes out of the redux state
  const dispatch=useDispatch();

const noteList=useSelector((state)=>state.noteList)
const {loading,notes,error}=noteList

    // const [notes,setNotes]=useState([])

const userLogin=useSelector(state=>state.userLogin)
const {userInfo}=userLogin;

const noteCreate = useSelector((state) => state.noteCreate);
const { success:successCreate } = noteCreate;


const noteUpdate = useSelector((state) => state.noteUpdate);
const { success: successUpdate } = noteUpdate;


const noteDelete=useSelector(state=>state.noteDelete)
const {loading:loadingDelete ,
  error:errorDelete,
  success:successDelete
}=noteDelete;
//when ever there is a change it will fire useeffect again

let navigate = useNavigate();

const deleteHandler=(id)=>{
        if(window.confirm("are you sure?")){
              dispatch(deleteNoteAction(id));
        }
    }
    // const fetchNotes= async()=>{
    //   const  { data } =await axios.get('/api/notes')
    //   // console.log(data);
    //   setNotes(data);
    // }
    console.log(notes);
    useEffect(()=>{
      // fetchNotes();
      dispatch(listNotes());//from notesActions

      if(!userInfo){
        navigate("/")
      }
    },[dispatch,successCreate,navigate,userInfo,successUpdate,successDelete]);//add dispatch in the list of dependencies
    return (
      <MainScreen title={`Welcome back ${userInfo.name}`}>
        <Link to="/createnote">
          <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
            Create New Note
          </Button>
        </Link>
        {error&&<ErrorMessage variant="danger">{error}</ErrorMessage>}
        {errorDelete && 
        (<ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading&& <Loading/>}
      
        {loadingDelete&& <Loading/>}
        {error && <ErrorMessage variant="danger">{error}
        </ErrorMessage>}
        {loading && <Loading/>}
        {notes?.reverse().filter(filteredNote=>(
          filteredNote.title.toLowerCase().includes(search.toLowerCase())
        ))
        .map((note) => (
          //reverse so that newest on top
          <Accordion defaultActiveKey={["0"]} key={note._id}>
            <Accordion.Item eventkey="0">
              <Card style={{ margin: 10 }}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    <Accordion.Button as={Card.Text} variant="link">
                     {note.title}
                    </Accordion.Button>
                  </span>
                  <div>
                    <Button href={`/note/${note._id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={()=>deleteHandler(note._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Collapse>
                  <Card.Body>
                    <h4>
                      <Badge bg="success" text="light">
                        Category - {note.category}{" "}
                      </Badge>
                    </h4>

                    <blockquote className="blockquote mb-0">
                      <ReactMarkdown>{note.content}</ReactMarkdown>
                      <footer className="blockquote-footer">
                        Creater on {" "}
                        <cite title="Source Title">
                          {note.createdAt.substring(0,10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion.Item>
          </Accordion>
        ))}
      </MainScreen>
    );
};
export default MyNotes;

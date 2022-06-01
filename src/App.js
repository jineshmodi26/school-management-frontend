import React from "react";
import FeesManagementPage from "./Pages/Admin/FeesManagement";
import FinanceManagementPage from "./Pages/Admin/FinanceManagement";
import StudentManagementPage from "./Pages/Admin/StudentManagement";
import SubjectManagementPage from "./Pages/Admin/SubjectManagement";
import ClassManagementPage from "./Pages/Admin/ClassManagement";
import TeacherManagementPage from "./Pages/Admin/TeacherManagement";
import ExamManagementPage from "./Pages/Admin/ExamManagement";
import NoticeBordPage from "./Pages/Admin/NoticeBord";
import ResultManagementPage from "./Pages/Admin/ResultManagement";
import AddClass from "./Components/Admin/Forms/AddClass";
import Login from "./Pages/Admin/Auth/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/login.css"
import AddTeacher from "./Components/Admin/Forms/AddTeacher";
import AddStudent from "./Components/Admin/Forms/AddStudent";
import AddSubject from "./Components/Admin/Forms/AddSubject";
import AddExam from "./Components/Admin/Forms/AddExam";
import AddExamTime from "./Components/Admin/Forms/AddExamTimecopy";
import AddResult from "./Components/Admin/Forms/AddResult";
import EditExam from "./Components/Admin/Forms/EditExam";
import EditClass from "./Components/Admin/Forms/EditClass";
import EditStudent from "./Components/Admin/Forms/EditStudent";
import EditTeacher from "./Components/Admin/Forms/EditTeacher";
import EditSubject from "./Components/Admin/Forms/EditSubject";
import EditFinance from "./Components/Admin/Forms/EditFinance";
import AddNotice from "./Components/Admin/Forms/AddNotice";
import EditNotice from "./Components/Admin/Forms/EditNotice";
import AddFinance from "./Components/Admin/Forms/AddFinalce";
import ViewClass from "./Components/Admin/Forms/ViewClass";
import ViewStudent from "./Components/Admin/Forms/ViewStudent";
import ViewSubject from "./Components/Admin/Forms/ViewSubject";
// import NotFound from "./Components/Admin/NotFound";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<ClassManagementPage />} />
          <Route path="/admin/login" element={<Login />}/>
          <Route path="/classes" element={<ClassManagementPage/>} />
          <Route path="/classes/add" element={<AddClass />}/>
          <Route path="/classes/edit/:id" element={<EditClass />}/>
          <Route path="/classes/view/:id" element={<ViewClass />} />
          <Route path="/Notices" element={<NoticeBordPage/>}/>
          <Route path="/Notices/add" element={<AddNotice/>}/>
          <Route path="/Notices/edit/:id" element={<EditNotice/>}/>
          <Route path="/teachers" element={<TeacherManagementPage />}/>
          <Route path="/teachers/add" element={<AddTeacher />} />
          <Route path="/teachers/edit/:id" element={<EditTeacher />} />
          <Route path="/students/" element={<StudentManagementPage />} />
          <Route path="/students/add" element={<AddStudent/>} />
          <Route path="/students/edit/:id" element={<EditStudent />} />
          <Route path="/students/view/:id" element={<ViewStudent />} />
          <Route path="/subjects" element={<SubjectManagementPage />} />
          <Route path="/subjects/add" element={<AddSubject/>} />
          <Route path="/subjects/edit/:id" element={<EditSubject />} />
          <Route path="/subjects/view/:id" element={<ViewSubject />} />
          <Route path="/finance" element={<FinanceManagementPage/>} />
          <Route path="/finance/add" element={<AddFinance/>} />
          <Route path="/finance/edit/:id" element={<EditFinance/>} />
          <Route path="/Exams" element={<ExamManagementPage/>} />
          <Route path="/Exams/add" element={<AddExam/>} />
          <Route path="/Exams/add/times" element={<AddExamTime/>} />
          <Route path="/fees" element={<FeesManagementPage/>} />
          <Route path="/Exams/edit/:id" element={<EditExam/>} />
          <Route path="/results" element={<ResultManagementPage />} />
          <Route path="/results/add" element={<AddResult />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

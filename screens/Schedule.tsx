import { StyleSheet, ScrollView, Button, ActivityIndicator, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RootTabScreenProps } from '../types';

import { Text, View, useThemeColor } from '../components/Themed';

export default function Schedule({ navigation }: RootTabScreenProps<'Home'>) {
  const color = useThemeColor({ light: 'black', dark: 'white' }, 'text');
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState({
    name: "",
    legalName: "",
    ufid: "",
    apps: [],
    email: "",
    switchUser: false
  });


  const [schedule, setSchedule] = useState({
      
      credits: 6,
      sections: [
          {
              classNumber: 11050,
              courseId: "010871",
              number: "0711",
              display: "0711",
              code: "CIS4914",
              name: "Senior Project",
              termInd: "",
              note: [],
              genEd: [],
              sectWeb: "PC",
              rotateTitle: "",
              deptCode: "19140000",
              deptName: "ENG(EG)-Comp/Info Sci & Eng",
              finalExam: "",
              grWriting: "N",
              courseFee: 0,
              EEP: "Y",
              instructors: [
                  "Mark Schmalz"
              ],
              meetTimes: [
                  {
                      meetNo: 1,
                      meetDays: [],
                      meetTimeBegin: "",
                      meetTimeEnd: "",
                      meetPeriodBegin: "",
                      meetPeriodEnd: "",
                      meetBuilding: "",
                      meetBldgCode: "",
                      meetRoom: ""
                  }
              ],
              LMS: "",
              droppable: "N",
              begin_date: "2022-01-05",
              end_date: "2022-04-20",
              startDate: "01/05/2022",
              endDate: "04/20/2022",
              credits: 3,
              remark: "",
              acadCareer: "UGRD",
              acadProg: "UGLAS",
              pastDeadline: true,
              enrollmentStatus: "E",
              enrollmentStatusDescription: "Enrolled",
              gradingBasis: "GRD",
              gradingBasisDescription: "Letter Grade",
              waitPosition: 0,
              enrollFromWait: "N"
          },
          {
              classNumber: 21105,
              courseId: "018679",
              number: "452A",
              display: "452A",
              code: "SYG2430",
              name: "Marriage and Family",
              termInd: "",
              note: [],
              genEd: [
                  "Social Science",
                  "Diversity"
              ],
              sectWeb: "PC",
              rotateTitle: "",
              deptCode: "16920500",
              deptName: "LAS(LS)-Sociology",
              finalExam: "4/25/2022 @ 10:00 AM - 12:00 PM",
              grWriting: "N",
              courseFee: 0,
              EEP: "Y",
              instructors: [
                  "Reha Atakan Cetin"
              ],
              meetTimes: [
                  {
                      meetNo: 1,
                      meetDays: [
                          "T"
                      ],
                      meetTimeBegin: "8:30 AM",
                      meetTimeEnd: "10:25 AM",
                      meetPeriodBegin: "2",
                      meetPeriodEnd: "3",
                      meetBuilding: "TUR",
                      meetBldgCode: "0267",
                      meetRoom: "2303"
                  },
                  {
                      meetNo: 2,
                      meetDays: [
                          "R"
                      ],
                      meetTimeBegin: "9:35 AM",
                      meetTimeEnd: "10:25 AM",
                      meetPeriodBegin: "3",
                      meetPeriodEnd: "3",
                      meetBuilding: "TUR",
                      meetBldgCode: "0267",
                      meetRoom: "2303"
                  }
              ],
              LMS: "",
              droppable: "N",
              begin_date: "2022-01-05",
              end_date: "2022-04-20",
              startDate: "01/05/2022",
              endDate: "04/20/2022",
              credits: 3,
              remark: "",
              acadCareer: "UGRD",
              acadProg: "UGLAS",
              pastDeadline: true,
              enrollmentStatus: "E",
              enrollmentStatusDescription: "Enrolled",
              gradingBasis: "GRD",
              gradingBasisDescription: "Letter Grade",
              waitPosition: 0,
              enrollFromWait: "N"
          }
      ],
      waitListSections: []
  })










  useEffect(() => {
    const url = "http://34.136.6.158:5000/api/";
    const headers = {
      'X-UF-Cookie': '_shibsession_68747470733a2f2f73712e6c6f67696e2e75666c2e6564752f75726e3a6564753a75666c3a70726f643a30303734312f68747470733a2f2f73702e6c6f67696e2e75666c2e6564752f75726e3a6564753a75666c3a70726f643a30303734312f=_CHARLES_',
      'X-Host-Choice': 'mock-host'
    }
    axios.get(url + "user", { headers: headers }).then((res) => {
      setUser(res.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    })
    
  })
  return (
    isLoading ? <View style={{ alignSelf: 'center', alignContent: 'center', alignItems: 'center' }}><ActivityIndicator size={'large'} color={'blue'} /></View> :
      <ScrollView >
        <View style={{ alignItems: "center", flex: 1, paddingTop: 60, paddingBottom: 60 }}>
          <Button title="Go to schedule of courses >" onPress={() => {
            navigation.navigate("SOC")
          }} />
          <View style={styles.separator} />

          <View style={styles.personal_info}>
            <Text style={styles.title}>{user.name}</Text>
          </View>



          <View style={styles.separator} />


          {schedule.sections.map((object: any, key: any) => {
                            return (
                                
                                
                              <View style={styles.section}>
                              <><><Text style={styles.body}>{"\n"}Class Number:{"\n"}{object.classNumber}{"\n"}Course ID:{"\n"}{object.courseID}
                                {"\n"}Number:{"\n"}{object.number}{"\n"}Display:{"\n"}{object.display}{"\n"}Code:{"\n"}{object.code}
                                {"\n"}Name:{"\n"}{object.name}{"\n"}Term Indicator:{"\n"}{object.termInd}{"\n"}Note:{"\n"}{object.note}
                                {"\n"}General Eduation:{"\n"}{object.genEd}{"\n"}Section Web:{"\n"}{object.sectWeb}{"\n"}Rotate Title:{"\n"}{object.rotateTitle}
                                {"\n"}Department Code:{"\n"}{object.deptCode}{"\n"}Department Name:{"\n"}{object.deptName}{"\n"}Final Exam:{"\n"}{object.finalExam}
                                {"\n"}GR Writing:{"\n"}{object.grWriting}{"\n"}Course Fee:{"\n"}{object.courseFee}{"\n"}EEP:{"\n"}{object.EEP}
                                {"\n"}Instructor(s):{"\n"}{object.instructors}</Text>
                              
                                
                                {object.meetTimes.map((object2: any, key2: any) => {
                            return ( 
                              <Text style={styles.body}>{"\n"}Meet Number:{"\n"}{object2.meetNo}{"\n"}Meet Days:{"\n"}{object2.meetDays}
                              {"\n"}Meet Time Begin:{"\n"}{object2.meetTimeBegin}{"\n"}Meet Time End:{"\n"}{object2.meetTimeEnd}
                              {"\n"}Meet Period Begin:{"\n"}{object2.meetPeriodBegin}{"\n"}Meet Period End:{"\n"}{object2.meetPeriodEnd}
                              {"\n"}Meet Building:{"\n"}{object2.meetBuilding}{"\n"}Meet Building Code:{"\n"}{object2.meetBldgCode}
                              {"\n"}Meet Room:{"\n"}{object2.meetRoom}</Text>
                            ); 
                            })}
                                
                                <Text style={styles.body}>{"\n"}LMS:{"\n"}{object.LMS}{"\n"}Droppable:{"\n"}{object.droppable}
                                {"\n"}Begin Date:{"\n"}{object.begin_date}{"\n"}End Date:{"\n"}{object.end_date}{"\n"}Start Date:{"\n"}{object.startDate}
                                {"\n"}End Date:{"\n"}{object.endDate}{"\n"}Credits:{"\n"}{object.credits}{"\n"}Remark:{"\n"}{object.remark}
                                {"\n"}Acad Career:{"\n"}{object.acadCareer}{"\n"}Acad Programming:{"\n"}{object.acadProg}
                                {"\n"}Past Deadline:{"\n"}{object.pastDeadline}{"\n"}Enrollment Status:{"\n"}{object.enrollmentStatus}
                                {"\n"}Number:{"\n"}{object.enrollmentStatusDescription}{"\n"}Grading Basis:{"\n"}{object.gradingBasis}
                                {"\n"}Grading Basis Description:{"\n"}{object.gradingBasisDescription}{"\n"}Wait Position:{"\n"}{object.waitPosition}
                                {"\n"}Enroll From Wait:{"\n"}{object.enrollFromWait}</Text></>

                                <View style={styles.separator} /></>
                                
                                </View>

                                );
                            })}

          <View style={styles.personal_info}>
            <Text style={styles.title}>{user.name}</Text>
          </View>

        </View>

      </ScrollView>

  )
}

const styles = StyleSheet.create({
  personal_info: {
    justifyContent: "flex-start",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#285697",
    marginTop: 1,
    borderRadius: 15,
    paddingBottom: 1,
    paddingTop: 1,
    width: '90%'
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  separator: {
    marginVertical: 30,
    width: '80%',
    color: '#285697',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  body: {
    textAlign: 'center',
    fontSize: 17,
  },

  subsection: {
    alignSelf: 'center',
    width: '90%',
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    paddingBottom: 15,
  },
  section: {
    alignSelf: 'center',
    width: '90%',
    borderColor: '#285697',
    borderWidth: 2,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    paddingBottom: 15,
    alignItems: 'center'
  }

});

import { StyleSheet, ScrollView, Button, ActivityIndicator, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RootTabScreenProps } from '../types';
import {TouchableOpacity} from 'react-native';

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

  const [pressed, press] = useState(false);
        function onPress() {
          press(!pressed)
      }


  useEffect(() => {
    let cancel = false;
    const url = "http://34.136.6.158:5000/api/";
    const headers = {
      'X-UF-Cookie': '_shibsession_68747470733a2f2f73712e6c6f67696e2e75666c2e6564752f75726e3a6564753a75666c3a70726f643a30303734312f68747470733a2f2f73702e6c6f67696e2e75666c2e6564752f75726e3a6564753a75666c3a70726f643a30303734312f=_' + globalThis.person + '_',
      'X-Host-Choice': 'mock-host'
    }
    axios.get(url + "user", { headers: headers }).then((res) => {
      if (cancel) return;
      setUser(res.data);
    }).catch((err) => {
      console.log(err);
    });
    axios.get(url + "current-schedule", { headers: headers }).then((res) => {
      if (cancel) return;
      setSchedule(res.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    });
    

    return () => { 
      cancel = true;
    }
  }, [globalThis.person])

  return (
    isLoading ? <View style={{ alignSelf: 'center', alignContent: 'center', alignItems: 'center' }}><ActivityIndicator size={'large'} color={'blue'} /></View> :
      <ScrollView >

        <View style={{ alignItems: "center", flex: 1, paddingTop: 60, paddingBottom: 60, backgroundColor: '#eaeaea' }}>

          <View style={styles.button}>
            <Button title="Go to schedule of courses >" onPress={() => {
              navigation.navigate("SOC")
            }} />
          </View>
          
          <View style={styles.separator} />

          <View style={styles.personal_info}>
            <Text style={styles.title}>{user.name}</Text>
          </View>

          <View style={styles.separator} />

          {schedule.sections.map((object: any, key: any) => {
            return (
              <DisplayDataFour data={object} />
            );
          })}

        </View>

      </ScrollView>
  )
}


function DisplayDataFour(props: any) {
  const [pressed, press] = useState(false);
  const data = props.data;
  const details = {
      html: data.details
  }
  return (
      <TouchableOpacity onPress={() => press(!pressed)} style={styles.bsection}>
          <Text style={[styles.body]}>{data.label}</Text>
          {pressed ?
            <View>
            <><><Text style={styles.title}>{data.code} : {data.name}</Text>
            </>
            <DisplayDataTwo data={data} />
                                            
            {data.meetTimes.map((object2: any, key2: any) => {
            return ( 
            <DisplayData data={object2} />
            ); 
            })}
              
            <DisplayDataThree data={data} />
            </>
            </View>
            :
            <Text style={styles.title}>{data.code} : {data.name}</Text>
          }

      </TouchableOpacity>
  )
}


function DisplayData(props: any) {
  const [pressed, press] = useState(false);
  const data = props.data;
  const details = {
      html: data.details
  }
  return (
      <TouchableOpacity onPress={() => press(!pressed)} style={styles.subsection}>
          <Text style={[styles.body]}>{data.label}</Text>
          {pressed ?
              <View>
              <Text style={styles.boldbody}>Meet Day Information</Text>
              <Text style={styles.body}>Meet Days: {data.meetDays}
              {"\n"}Meet Time Begin: {data.meetTimeBegin}{"\n"}Meet Time End: {data.meetTimeEnd}
              {"\n"}Meet Building: {data.meetBuilding}{"\n"}Meet Building Code: {data.meetBldgCode}
              {"\n"}Meet Room: {data.meetRoom}</Text>
              </View>

                  :
              <Text style={styles.boldbody}>Meet Day Information</Text>
          }

      </TouchableOpacity>
  )
}

function DisplayDataTwo(props: any) {
  const [pressed, press] = useState(false);
  const data = props.data;
  const details = {
      html: data.details
  }
  return (
      <TouchableOpacity onPress={() => press(!pressed)} style={styles.subsection}>
          <Text style={[styles.body]}>{data.label}</Text>
          {pressed ?
              <View>
              <Text style={styles.boldbody}>Class Information</Text>
              <Text style={styles.body}>Class Number: {data.classNumber}{"\n"}Course ID: {data.courseID}
              {"\n"}Note: {data.note}
              {"\n"}Department Code: {data.deptCode}{"\n"}Department Name: {data.deptName}{"\n"}Final Exam: {data.finalExam}
              {"\n"}Instructor(s): {data.instructors}</Text>
              </View>
          :
              <Text style={styles.boldbody}>Class Information</Text>
          }

      </TouchableOpacity>
  )
}

function DisplayDataThree(props: any) {
  const [pressed, press] = useState(false);
  const data = props.data;
  const details = {
      html: data.details
  }
  return (
      <TouchableOpacity onPress={() => press(!pressed)} style={styles.subsection}>
          <Text style={[styles.body]}>{data.label}</Text>
          {pressed ?
              <View>
              <Text style={styles.boldbody}>Grading Info/ Enrollment Status</Text>
              <Text style={styles.body}>Droppable: {data.droppable}
              {"\n"}Start Date: {data.startDate}
              {"\n"}End Date: {data.endDate}{"\n"}Credits: {data.credits}{"\n"}Remark: {data.remark}
              {"\n"}Past Deadline: {data.pastDeadline}{"\n"}Enrollment Status: {data.enrollmentStatus}
              {"\n"}Grading Basis: {data.gradingBasisDescription}
              {"\n"}Wait Position: {data.waitPosition}
              {"\n"}Enroll From Wait: {data.enrollFromWait}</Text>
              </View>
              :
              <Text style={styles.boldbody}>Grading Info/ Enrollment Status</Text>
          }

      </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  personal_info: {
    justifyContent: "flex-start",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#a6a6a6",
    borderRadius: 6,
    width: '80%',
    padding: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  separator: {
    alignItems: "center",
    marginVertical: 30,
    width: '80%',
    color: '#285697',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  body: {
    textAlign: 'justify',
    fontSize: 17,
  },
  boldbody: {
    textAlign: 'justify',
    fontSize: 17,
    fontWeight: 'bold'
  },
  asection: {
    textAlign: 'left',
    fontSize: 17,
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
  },
  bsection: {
    alignSelf: 'center',
    width: '90%',
    borderColor: '#a6a6a6',
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: '#fff'
  },
  button: {
    marginTop: 40
  }

});

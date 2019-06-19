export const styles = {
  CompanyDetails: {
    padding: 40,
    backgroundColor: "#3D4858",
    shadowColor: "#000",
    width: "90%",
    borderRadius: 20,
    shadowOpacity: 0.7,
    shadowRadius: 3,
    shadoOffset: {
      width: 0,
      height: 1
    },
    alignSelf: "center",
    justifyContent:'space-between',
    paddingBottom:200,
    marginVertical: 20,
    flex: 1
  },
  companyCard: {
    padding: 20,
    backgroundColor: "#3D4858",
    shadowColor: "#000",
    width: "80%",
    height: 120,
    borderRadius: 20,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 1
    },
    alignSelf: "center",
    marginVertical: 15,
    flex: 1
  },
  circle: { width: 25, height: 25, borderRadius: 15, borderWidth: 5 },
  rectangle: { width: 50, height: 5 },

  text: {
    height: 50,
    borderStyle: "solid",
    borderBottomColor: "#74808E",
    borderBottomWidth: 1,
    // borderRadius: 10,
    marginBottom: 30,
    fontSize: 18,
    color: "#FFFFFF"
  },
  button: {
    alignItems: "center",
    height: 52,
    backgroundColor: "#4FDBBA",
    borderStyle: "solid",
    borderColor: "#74808E",
    borderRadius: 40,
    borderWidth: 1,
    padding: 15,
    marginBottom: 10,
  },
  buttonSignOut: {
    alignItems: "center",
    height: 52,
    backgroundColor: "#293749",
    borderStyle: "solid",
    borderColor: "#F08080",
    borderWidth: 1,
    padding: 15,
    borderRadius:100,
    marginBottom: 10,
    marginHorizontal: 40,
    color: "#F08080",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadoOffset: {
      height: 3
    }
  },
  buttonError: {
    alignItems: "center",
    height: 52,
    backgroundColor: "white",
    borderStyle: "solid",
    borderColor: "#FF0000",
    borderWidth: 1,
    padding: 15,
    marginBottom: 10,
    marginHorizontal: 40,
  },
  avatar: {
    borderColor: "#90F6DE",
    borderRadius: "50px",
    borderWidth: "1",
    width: 70,
    height: 70,
    backgroundColor: "#3D4858",
    padding: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    padding: 20,
    flex:1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#1C2632"
  },
  container2: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  }
};

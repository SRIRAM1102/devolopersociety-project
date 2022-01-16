app.get("/user/signup", async (request, response) => {
  const client = await createConnection();
  const result = await client
    .db("mobile")
    .collection("userlog")
    .find({})
    .toArray();
  console.log(result);
  response.send(result);
});
app.delete("/user/signup/:id", async (request, response) => {
  const { id } = request.params;
  const client = await createConnection();
  const result = await client
    .db("mobile")
    .collection("userlog")
    .deleteOne({ _id: ObjectId(id) });

  console.log(result);
  response.send(result);
});

////////////////
app.post("/company", async (request, response) => {
  const { logo, company, location, field, description } = request.body;
  const userdata = request.body;
  console.log(logo, company, location, field, description);

  const client = await createConnection();
  const result = await client.db("mobile").collection("company").insertOne({
    logo: logo,
    company: company,
    location: location,
    field: field,
    description: description,
  });
  console.log(userdata);
  response.send(userdata);
});

app.delete("/company/:id", async (request, response) => {
  const { id } = request.params;
  const client = await createConnection();
  const result = await client
    .db("mobile")
    .collection("company")
    .deleteOne({ _id: ObjectId(id) });

  console.log(result);
  response.send(result);
});


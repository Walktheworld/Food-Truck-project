import { useState, useContext } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { UserContext } from "../context/user";
import { Button, Error, FormField, Input, Label } from "../styles";

function NewPage() {
  const [name, setName] = useState("Name");
  const [phone, setPhone] = useState("xxx-xxx-xxxx");
  const [website, setWebsite] = useState(`website`);
  const [address, setAddress] = useState(`address`);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { user } = useContext(UserContext);

  const handleSubmit= e => {
    e.preventDefault();
    setIsLoading(true);
    fetch("/api/pages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        website,
        phone,
        address,
      }),
      })
      .then((r) => {
      setIsLoading(false);
      if (r.ok) {
        history.push("/pages");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <Wrapper>
      <WrapperChild>
        <h2>Create Food Truck Page</h2>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="name">name</Label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              type="number"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              rows="10"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              rows="10"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormField>
          <FormField>
            <Button color="primary" type="submit">
              {isLoading ? "Loading..." : "Submit Food Tuck"}
            </Button>
          </FormField>
          <FormField>
            {errors?.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField>
        </form>
      </WrapperChild>
      <WrapperChild>
        <h1>{name}</h1>
        <p>
          <em>Phone #: {phone}</em>
          &nbsp;·&nbsp; 
          <em>{website}</em>
          <br/>
          <em>{address}</em>
          &nbsp;·&nbsp; 
          <cite>By {user.username}</cite>
        </p>
      </WrapperChild>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 24px;
`;

const WrapperChild = styled.div`
  flex: 1;
`;

export default NewPage;

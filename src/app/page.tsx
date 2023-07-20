export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form>
        <label>First name</label>
        <input type="text"/>
        
        <label>Last name</label>
        <input type="text"/>
        
        <label>Email</label>
        <input type="email"/>
        
        <label>Age</label>
        <input type="number"/>
        
        <label>Password</label>
        <input type="text"/>
        
        <label>Confirm password</label>
        <input type="text"/>

        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

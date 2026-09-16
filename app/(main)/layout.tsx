import Header from "../components/layouts/Header";

const MainLayout = ({children} : {children:React.ReactNode}) => {
  return(
    <>
      <Header/>
      <main className="cointainer mx-auto px-4 py-8">{children}</main>
    </>
  )
}

export default MainLayout;
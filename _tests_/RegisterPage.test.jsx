import { render, screen} from "@testing-library/react";
import RegisterPage from "@/app/(public)/candidate-registration/page";


describe("RegisterPage", () => {
    it('Should render correctly', () => {
        render(<RegisterPage />); //ARRANGE

        const myElement = screen.getByText("Conexão Carreira"); //ACT

        expect(myElement).toBeInTheDocument();//A
    })
})
const request = require("supertest");
const nodemailer = require("nodemailer");
//Import de l'application (app.js)
const app = require("./app");

jest.mock("nodemailer");

// Configuration du Mock pour l'envoi de mail
const mockSendMail = jest.fn();
nodemailer.createTransport.mockReturnValue({ sendMail: mockSendMail });

//Début des tests
describe("API NodeJS Tests", () => {
  // Test de la route GET /
  it("should fetch data", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Object));
  });

  // Test de la route POST /mail
  it("should send an email", async () => {
    const mockRequestBody = JSON.stringify({
      parcours: ["Réponse 1", "Réponse 2"],
      questions: ["Question 1", "Question 2"],
      inputs: { Email: "test@example.com", Nom: "Test Nom" },
    });

    mockSendMail.mockResolvedValueOnce({});

    const response = await request(app)
      .post("/mail")
      .send(mockRequestBody)
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe("Sending Email");
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: expect.stringContaining("noreply - GoWeb Test"),
        to: expect.arrayContaining(["test@example.com", "agrappin1@gmail.com"]),
        subject: "[Goweb Test Technique] Email Récapitulatif",
        text: expect.any(String),
        html: expect.any(String),
      })
    );
  });
});

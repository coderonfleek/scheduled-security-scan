const puppeteer = require('puppeteer');

const user_email = "test@example.com";
const non_threat_site = "facebook.com";
const malicious_site = "selcdn.ru";
const phishing_site = "mail.glesys.se";
const expected_safe_site_message = "Entry clean, process form";
const expected_threat_site_message = "Threat Detected. Do not Process";

test("Check Non-threat Site Entry", async () => {

  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
  
    await page.goto('http://localhost:5000');

    await page.type('#userEmail', user_email);
    await page.type('#userSite', non_threat_site);
    await page.click('#submitButton');

    let messageContainer = await page.$('#infoDisplay');
    await page.waitForTimeout(4000);
    let value = await messageContainer.evaluate(el => el.textContent);

    console.log(value);
  
    expect(value).toBe(expected_safe_site_message);
    
  } finally {
    await browser.close();
  }
  
  
}, 120000);

test("Check Malicious Site Entry", async () => {

  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
  
    await page.goto('http://localhost:5000');

    await page.type('#userEmail', user_email);
    await page.type('#userSite', malicious_site);
    await page.click('#submitButton');

    let messageContainer = await page.$('#infoDisplay');
    await page.waitForTimeout(4000);

    let value = await messageContainer.evaluate(el => el.textContent);

    console.log(value);
  
    expect(value).toBe(expected_threat_site_message);
    
  } finally {
    await browser.close();
  }
  
  
}, 120000);
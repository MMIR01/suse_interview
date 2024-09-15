package main

import (
	"bytes"
	"crypto/tls"
	"io"
	"net/http"
	"testing"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
)

var _ = Describe("Rancher API Login", func() {

	var httpClient *http.Client
	url := "https://localhost/v3-public/localProviders/local?action=login"

	BeforeEach(func() {
		tr := &http.Transport{
			TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
		}
		httpClient = &http.Client{Transport: tr}
	})

	Describe("TC01 Login to Rancher API sucessfully", func() {
		It("TC01 Login to Rancher API sucessfully", func() {
			// Payload for login
			var jsonStr = []byte(
				`{"description": null,
				"password": "openSUSE2024",
				"responseType": null,
				"ttl": 0,
				"username": "admin"}`)

			req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
			req.Header.Set("Content-Type", "application/json")

			resp, err := httpClient.Do(req)
			Expect(err).ShouldNot(HaveOccurred())
			defer resp.Body.Close()

			body, _ := io.ReadAll(resp.Body)
			Expect(resp.StatusCode).Should(Equal(201))
			Expect(string(body)).Should(ContainSubstring("token"))
		})
	})

	Describe("TC02 Wrong login to Rancher API", func() {
		It("TC02 Wrong login to Rancher API", func() {
			// Payload for login
			var jsonStr = []byte(
				`{"description": null,
				"password": "wrongpass",
				"responseType": null,
				"ttl": 0,
				"username": "admin"}`)

			req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
			req.Header.Set("Content-Type", "application/json")

			resp, err := httpClient.Do(req)
			Expect(err).ShouldNot(HaveOccurred())
			defer resp.Body.Close()

			body, _ := io.ReadAll(resp.Body)
			Expect(resp.StatusCode).Should(Equal(401))
			Expect(string(body)).Should(ContainSubstring("authentication failed"))
		})
	})

})

func TestAPILogin(t *testing.T) {
	RegisterFailHandler(Fail)
	RunSpecs(t, "Rancher API Test Suite")
}

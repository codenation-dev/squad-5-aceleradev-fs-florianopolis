package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestDownload(t *testing.T) {
	err := DownloadSpEmployees()
	assert.Nil(t, err)
}

func TestUnzip(t *testing.T) {
	s, err := Unzip("Remuneracao.zip", "output-folder")
	assert.NotNil(t, s)
	assert.Nil(t, err)
	
}
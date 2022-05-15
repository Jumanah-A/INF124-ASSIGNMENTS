package com.example.store;

public class ProductInfo {
    String id;
    String title;
    String image;
    int rate;
    String count;
    String details;

    public ProductInfo(String id, String title, String image, int rate, String count, String details) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.rate = rate;
        this.count = count;
        this.details = details;
    }

    public String getId() {
        return this.id;
    }

    public String getTitle() {
        return this.title;
    }

    public String getImage() {
        return this.image;
    }

    public int getRate() {
        return this.rate;
    }

    public String getCount() {
        return this.count;
    }

    public String getDetails() {
        return this.details;
    }

    //
    public void setId(String id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void getRate(int rate) {
        this.rate = rate;
    }

    public void getCount(String count) {
        this.count = count;
    }

    public void getDetails(String details) {
        this.details = details;
    }

    public String toString() {
        return this.id + " " + this.title + " " +  image + " " +  rate + " " + count
        + " " +  details;
    }



}

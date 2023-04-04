package com.fdl.crudspring.enums;


public enum Category {

    BACK_END("Back-End"), FRONT_END("Front-End");

    private String value;

    private Category(String value){
        this.value = value;
    }

    public String getValue(){
        return value;
    }

    @Override
    public String toString() {
        return value;
    }

}

package com.example.highenddetailing.servicessubdomain.businesslayer;

import com.example.highenddetailing.servicessubdomain.businesslayer.ServiceServiceImpl;
import com.example.highenddetailing.servicessubdomain.datalayer.Service;
import com.example.highenddetailing.servicessubdomain.datalayer.ServiceIdentifier;
import com.example.highenddetailing.servicessubdomain.datalayer.ServiceRepository;
import com.example.highenddetailing.servicessubdomain.domainclientlayer.ServiceResponseModel;
import com.example.highenddetailing.servicessubdomain.mapperlayer.ServiceResponseMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ServiceServiceUnitTest {

    @Mock
    private ServiceRepository serviceRepository;
    @Mock
    private ServiceResponseMapper serviceResponseMapper;
    @InjectMocks
    private ServiceServiceImpl serviceService;

    @Test
    void whenGetAllServices_thenReturnAllServices() {
        // Arrange
        Service service1 = new Service(1, new ServiceIdentifier(), "Test Service 1", "1 Hour", 100.00f, "TEST");
        Service service2 = new Service(2, new ServiceIdentifier(), "Test Service 2", "2 Hours", 200.00f, "TEST");

        List<Service> services = List.of(service1, service2);
        List<ServiceResponseModel> responseModels = List.of(
                new ServiceResponseModel("id1", "Test Service 1", "1 Hour", 100.00f, "detailing-service-1"),
                new ServiceResponseModel("id2", "Test Service 2", "2 Hours", 200.00f, "detailing-service-1")
        );

        when(serviceRepository.findAll()).thenReturn(services);
        when(serviceResponseMapper.entityListToResponseModel(services)).thenReturn(responseModels);

        List<ServiceResponseModel> serviceResponse = serviceService.getAllServices();

        assertEquals(2, serviceResponse.size()); // Assert that the returned list has 2 elements
        assertEquals("id1", serviceResponse.get(0).getServiceId());
        assertEquals("Test Service 1", serviceResponse.get(0).getServiceName());
        assertEquals("1 Hour", serviceResponse.get(0).getTimeRequired());
        assertEquals(100.00f, serviceResponse.get(0).getPrice());

        assertEquals("id2", serviceResponse.get(1).getServiceId());
        assertEquals("Test Service 2", serviceResponse.get(1).getServiceName());
        assertEquals("2 Hours", serviceResponse.get(1).getTimeRequired());
        assertEquals(200.00f, serviceResponse.get(1).getPrice());
    }

}